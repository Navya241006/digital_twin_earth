import React, { useState } from "react";

const ControlPanel = () => {
  const [rainfall, setRainfall] = useState(50);

  const runSimulation = async () => {
    try {
      const res = await fetch(
        "https://digitaltwinearth-production.up.railway.app/simulate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rainfall }),
        }
      );

      const data = await res.json();
      console.log("Simulation result:", data);
      alert("Simulation done! Check console");
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to backend");
    }
  };

  return (
    <div>
      <h3>Simulation Controls</h3>

      <input
        type="range"
        min="0"
        max="200"
        value={rainfall}
        onChange={(e) => setRainfall(e.target.value)}
      />

      <button onClick={runSimulation}>
        Run Simulation
      </button>
    </div>
  );
};

export default ControlPanel;