import React, { useState } from "react";

const ControlPanel = ({ onSimulate }) => {
  const [rainfall, setRainfall] = useState(50);

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
      <button onClick={() => onSimulate(rainfall)}>
        Run Simulation
      </button>
    </div>
  );
};

export default ControlPanel;