import React from "react";

function About() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>About Project</h1>

      <div className="card">
        <h3>Digital Twin Earth</h3>
        <p>
          A simulation system that predicts environmental risks and provides
          actionable insights.
        </p>
      </div>

      <div className="card">
        <h3>Features</h3>
        <ul>
          <li>Real-time simulation</li>
          <li>Visual animations</li>
          <li>Risk classification</li>
          <li>Precautions & health risks</li>
        </ul>
      </div>

      <div className="card">
        <h3>Tech Stack</h3>
        <ul>
          <li>React</li>
          <li>Flask</li>
          <li>Framer Motion</li>
        </ul>
      </div>
    </div>
  );
}

export default About;