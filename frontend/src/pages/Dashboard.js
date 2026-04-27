import React from "react";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div className="card">
        <h3>System Overview</h3>
        <p>
          This dashboard provides structured analysis of environmental risks.
        </p>
      </div>

      <div className="card">
        <h3>Insights</h3>
        <ul>
          <li>Flood, AQI, Temperature, Earthquake risks</li>
          <li>Risk classification (Low, Medium, High)</li>
          <li>Precautions and health advisory</li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;