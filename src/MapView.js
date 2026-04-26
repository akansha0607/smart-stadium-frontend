import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";

const BASE_URL = "http://localhost:8080/stadium";

// 🎨 color logic
function getColor(density) {
  if (density < 50) return "green";
  if (density < 150) return "orange";
  return "red";
}

// 📍 Stadium zones
function getCoords(zoneId) {
  if (zoneId === "A") return [28.6379, 77.2430];
  if (zoneId === "B") return [28.6390, 77.2450];
  if (zoneId === "C") return [28.6365, 77.2415];
  return [28.6379, 77.2430];
}

// 🔥 Auto zoom to route
function FitBounds({ route }) {
  const map = useMap();

  useEffect(() => {
    if (route && route.length > 1) {
      const bounds = route.map(zone => getCoords(zone));
      map.fitBounds(bounds);
    }
  }, [route, map]);

  return null;
}

// 🔥 Heatmap handler (fix for mapRef issue)
function HeatMap({ zones }) {
  const map = useMap();
  const heatRef = useRef(null);

  useEffect(() => {
    if (!zones.length) return;

    const heatData = zones.map(zone => {
      const coords = getCoords(zone.zoneId);
      return [coords[0], coords[1], zone.density / 200];
    });

    // remove old
    if (heatRef.current) {
      map.removeLayer(heatRef.current);
    }

    const heatLayer = L.heatLayer(heatData, {
      radius: 25,
      blur: 20,
      maxZoom: 17
    });

    heatLayer.addTo(map);
    heatRef.current = heatLayer;

  }, [zones, map]);

  return null;
}

// 🚀 MAIN COMPONENT
function MapView({ route }) {
  const [zones, setZones] = useState([]);

  // 🔄 fetch live crowd
  useEffect(() => {
    const fetchData = () => {
      axios.get(`${BASE_URL}/crowd`)
        .then(res => {
          const data = Object.values(res.data);
          setZones(data);
        })
        .catch(err => console.error(err));
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[28.6379, 77.2430]}
      zoom={17}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🔥 Heatmap */}
      <HeatMap zones={zones} />

      {/* 📍 Crowd markers */}
      {zones.map(zone => (
        <CircleMarker
          key={zone.zoneId}
          center={getCoords(zone.zoneId)}
          radius={20}
          pathOptions={{ color: getColor(zone.density) }}
        >
          <Popup>
            Zone {zone.zoneId} <br />
            Density: {zone.density}
          </Popup>
        </CircleMarker>
      ))}

      {/* 🚀 ROUTE LINE */}
      {route && route.length > 1 && (
        <Polyline
          positions={route.map(zone => getCoords(zone))}
          pathOptions={{ color: "blue", weight: 6 }}
        />
      )}

      {/* 🔥 Auto zoom */}
      <FitBounds route={route} />
    </MapContainer>
  );
}

export default MapView;