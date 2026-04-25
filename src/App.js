import { useState } from "react";
import axios from "axios";
import MapView from "./MapView";

const BASE_URL = "http://localhost:8080/stadium";

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

  // 🚀 Get Route
  const getRoute = () => {
    axios.get(`${BASE_URL}/route?src=${src}&dest=${dest}`)
      .then(res => {
        setOutput("Best Route: " + res.data.join(" → "));
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🏟️ Smart Stadium Dashboard</h1>

      {/* 🗺️ Map */}
      <MapView />

      {/* 🚶 Crowd */}
      <h3>Update Crowd</h3>
      <input placeholder="Zone (A)" onChange={e => setZone(e.target.value)} />
      <input placeholder="Density (100)" onChange={e => setDensity(e.target.value)} />
      <button onClick={updateCrowd}>Update</button>

      {/* ⏱️ Queue */}
      <h3>Add Queue</h3>
      <input placeholder="Location (Food1)" onChange={e => setLoc(e.target.value)} />
      <input placeholder="People" onChange={e => setPeople(e.target.value)} />
      <input placeholder="Service Time" onChange={e => setServiceTime(e.target.value)} />
      <button onClick={updateQueue}>Update</button>

      {/* 🧭 Path */}
      <h3>Add Path</h3>
      <input placeholder="From" onChange={e => setFrom(e.target.value)} />
      <input placeholder="To" onChange={e => setTo(e.target.value)} />
      <input placeholder="Weight" onChange={e => setWeight(e.target.value)} />
      <button onClick={addPath}>Add</button>

      {/* 🚀 Route */}
      <h3>Find Route</h3>
      <input placeholder="Source" onChange={e => setSrc(e.target.value)} />
      <input placeholder="Destination" onChange={e => setDest(e.target.value)} />
      <button onClick={getRoute}>Find</button>

      <h3 style={{ marginTop: "20px", color: "green" }}>{output}</h3>
    </div>
  );
}

export default App;