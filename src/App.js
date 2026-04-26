import { useState } from "react";
import axios from "axios";
import MapView from "./MapView";
const BASE_URL = "https://smart-stadium-backend-101294621882.asia-south1.run.app/stadium";

function App() {
  // Crowd
  const [zone, setZone] = useState("");
  const [density, setDensity] = useState("");

  // Queue
  const [loc, setLoc] = useState("");
  const [people, setPeople] = useState("");
  const [serviceTime, setServiceTime] = useState("");

  // Route
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("");

  const [src, setSrc] = useState("");
  const [dest, setDest] = useState("");

  const [output, setOutput] = useState("");
  const [route, setRoute] = useState([]);

  // 🚶 Crowd API
  const updateCrowd = () => {
    axios.post(`${BASE_URL}/crowd?zone=${zone}&density=${density}`)
      .then(res => setOutput("Crowd Updated"))
      .catch(err => console.error(err));
  };

  // ⏱️ Queue API
  const updateQueue = () => {
    axios.post(`${BASE_URL}/queue?loc=${loc}&people=${people}&serviceTime=${serviceTime}`)
      .then(res => setOutput("Queue Updated"))
      .catch(err => console.error(err));
  };

  // 🧭 Add Path
  const addPath = () => {
    axios.post(`${BASE_URL}/path?from=${from}&to=${to}&weight=${weight}`)
      .then(res => setOutput("Path Added"))
      .catch(err => console.error(err));
  };

  // 🚀 Get Route (FIXED)
const getRoute = () => {
  axios.get(`${BASE_URL}/route?src=${src}&dest=${dest}`)
    .then(res => {
      const path = res.data;

      // 🔥 THIS IS THE KEY CHANGE
      setRoute(path);

      // better output
      setOutput(`🚀 Optimal Route: ${path.join(" → ")}`);
    })
    .catch(err => console.error(err));
};

  const cardStyle = {
  border: "1px solid #eee",
  borderRadius: "10px",
  padding: "15px",
  marginTop: "15px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const highlightCard = {
  border: "2px solid #007bff",
  borderRadius: "12px",
  padding: "20px",
  marginTop: "15px",
  background: "#f8fbff"
};

const subText = {
  fontSize: "12px",
  color: "gray",
  marginBottom: "10px"
};

  return (
  <div style={{ padding: "20px" }}>

    {/* 🏟️ Heading */}
    <h1 style={{
      textAlign: "center",
      fontSize: "32px",
      marginBottom: "10px"
    }}>
      🏟️ Smart Stadium Intelligence System
    </h1>

    <p style={{ textAlign: "center", color: "gray", marginBottom: "20px" }}>
      Real-time crowd monitoring • Smart routing • Queue optimization
    </p>

    {/* 🗺️ Map */}
    <MapView route={route} />

    {/* 🚶 Crowd Control */}
    <div style={cardStyle}>
      <h3>🚶 Live Crowd Control</h3>
      <p style={subText}>Update real-time crowd density</p>

      <input
        placeholder="Zone (A)"
        value={zone}
        onChange={(e) => setZone(e.target.value)}
      />

      <input
        placeholder="Density (100)"
        value={density}
        onChange={(e) => setDensity(e.target.value)}
      />

      <button onClick={updateCrowd}>Update</button>
    </div>

    {/* 🍔 Queue */}
    <div style={cardStyle}>
      <h3>🍔 Queue Monitoring</h3>
      <p style={subText}>Manage waiting times</p>

      <input
        placeholder="Location (Food1)"
        onChange={(e) => setLoc(e.target.value)}
      />

      <input
        placeholder="People"
        onChange={(e) => setPeople(e.target.value)}
      />

      <input
        placeholder="Service Time"
        onChange={(e) => setServiceTime(e.target.value)}
      />

      <button onClick={updateQueue}>Update</button>
    </div>

    {/* 🧭 Path */}
    <div style={cardStyle}>
      <h3>🧭 Stadium Navigation Setup</h3>

      <input placeholder="From" onChange={(e) => setFrom(e.target.value)} />
      <input placeholder="To" onChange={(e) => setTo(e.target.value)} />
      <input placeholder="Weight" onChange={(e) => setWeight(e.target.value)} />

      <button onClick={addPath}>Add</button>
    </div>

    {/* 🚀 Route */}
    <div style={highlightCard}>
      <h3>🚀 Smart Route Finder</h3>

      <input placeholder="Source" onChange={(e) => setSrc(e.target.value)} />
      <input placeholder="Destination" onChange={(e) => setDest(e.target.value)} />

      <button onClick={getRoute}>Find Optimal Route</button>

      <p style={{ marginTop: "10px", color: "green" }}>{output}</p>
    </div>

  </div>
);
}

export default App;