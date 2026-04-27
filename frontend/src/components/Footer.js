import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>Digital Twin Earth</h3>
        <p>
          Real-time environmental simulation for smarter and safer cities.
        </p>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/about">About</a>
        </div>

        <p className="footer-copy">
         © {new Date().getFullYear()} Digital Twin Earth | Designed and Developed by Code_Explorers
        </p>
      </div>
    </footer>
  );
}

export default Footer;