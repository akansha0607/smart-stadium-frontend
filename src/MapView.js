import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

const BASE_URL = "http://localhost:8080/stadium";

function getColor(density) {
  if (density < 50) return "green";
  if (density < 150) return "orange";
  return "red";
}

// zone → coordinates mapping
function getCoords(zoneId) {
  if (zoneId === "A") return [28.4595, 77.0266];
  if (zoneId === "B") return [28.4620, 77.0300];
  if (zoneId === "C") return [28.4550, 77.0220];
  return [28.4595, 77.0266];
}

function MapView() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get(`${BASE_URL}/crowd`)
        .then(res => {
          console.log("LIVE DATA:", res.data); // 👈 debug
          const data = Object.values(res.data);
          setZones(data);
        })
        .catch(err => console.error(err));
    };

    fetchData(); // initial

    const interval = setInterval(fetchData, 3000); // every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[28.4595, 77.0266]}
      zoom={15}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {zones.map(zone => (
        <CircleMarker
          key={zone.zoneId}
          center={getCoords(zone.zoneId)}
          radius={20}
          color={getColor(zone.density)}
        >
          <Popup>
            Zone {zone.zoneId} <br />
            Density: {zone.density}
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

export default MapView;