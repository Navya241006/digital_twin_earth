import lightRain from "../assets/sounds/light-rain.mp3";
import heavyRain from "../assets/sounds/heavy-rain.mp3";
import earthquakeSound from "../assets/sounds/earthquake.mp3";
import windSound from "../assets/sounds/wind.mp3";
import pollutionSound from "../assets/sounds/pollution.mp3";
import heatSound from "../assets/sounds/heat.mp3";
import snowSound from "../assets/sounds/snow.mp3";
import { useRef } from "react";
import React, { useState } from "react";
import { runSimulation } from "../services/api";
import MapView from "../components/MapView";
import {
  LightRain,
  HeavyRain,
  Snow,
  Heat,
  Earthquake,
  Smoke,
  Breeze,
} from "../components/Effects";
import "../App.css";

function Home() {
const [isMuted, setIsMuted] = useState(false);
const audioRef = useRef(null);

const playSound = (soundFile, duration = 10000) => {
  if (isMuted) return; // 🔇 IMPORTANT

  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  const audio = new Audio(soundFile);
  audio.volume = 0.5;

  audio.play().catch(() => {});

  audioRef.current = audio;

  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, duration);
};

  const [inputs, setInputs] = useState({
    rainfall: "",
    earthquake: "",
    aqi: "",
    temperature: "",
  });

  const [result, setResult] = useState(null);
  const [activeEffects, setActiveEffects] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
  if (inputs.rainfall && (inputs.rainfall < 0 || inputs.rainfall > 300)) {
    return "Rainfall must be between 0 and 300 mm";
  }

  if (inputs.earthquake && (inputs.earthquake < 0 || inputs.earthquake > 10)) {
    return "Earthquake magnitude must be between 0 and 10";
  }

  if (inputs.aqi && (inputs.aqi < 0 || inputs.aqi > 500)) {
    return "AQI must be between 0 and 500";
  }

  if (inputs.temperature && (inputs.temperature < -20 || inputs.temperature > 60)) {
    return "Temperature must be between -20°C and 60°C";
  }

  return null;
  };
  const handleSimulation = async () => {
    if (audioRef.current) {
  audioRef.current.pause();
  audioRef.current.currentTime = 0;
}
  if (
    inputs.rainfall === "" &&
    inputs.earthquake === "" &&
    inputs.aqi === "" &&
    inputs.temperature === ""
  ) {
    alert("Please enter at least one parameter!");
    return;
  }

  const error = validateInputs();
  if (error) {
    alert(error);
    return;
  }

  setLoading(true);

  try {
    const data = await runSimulation(inputs);
    // 🔊 SOUND SYSTEM
// 🔊 SOUND SYSTEM (ONLY ONE AT A TIME)

if (data.earthquake_risk === "HIGH") {
  playSound(earthquakeSound);
}
else if (data.flood_risk === "HIGH") {
  playSound(heavyRain);
}
else if (data.flood_risk === "LOW" || data.flood_risk === "MEDIUM") {
  playSound(lightRain);
}
else if (
  data.air_quality === "UNHEALTHY" ||
  data.air_quality === "VERY UNHEALTHY" ||
  data.air_quality === "HAZARDOUS"
) {
  playSound(pollutionSound);
}
else if (data.air_quality === "GOOD") {
  playSound(windSound);
}
else if (data.weather_status === "EXTREME HEAT") {
  playSound(heatSound);
}
else if (data.weather_status === "COLD") {
  playSound(snowSound);
}

    setResult(data);
    setActiveEffects(data);

    setTimeout(() => {
      setActiveEffects({});
    }, 10000);
  } catch (error) {
    alert("Backend not responding properly");
  }

  setLoading(false);
};

  /* 🌍 EFFECT SYSTEM */
  const renderEffects = () => {
    if (!activeEffects) return null;

    return (
      <>
        {/* Rain */}
        {(activeEffects.flood_risk === "LOW" ||
          activeEffects.flood_risk === "MEDIUM") && <LightRain />}

        {activeEffects.flood_risk === "HIGH" && <HeavyRain />}

        {/* Weather */}
        {activeEffects.weather_status === "COLD" && <Snow />}
        {activeEffects.weather_status === "EXTREME HEAT" && <Heat />}

        {/* AQI */}
        {activeEffects.air_quality === "GOOD" && <Breeze />}

        {(activeEffects.air_quality === "UNHEALTHY" ||
          activeEffects.air_quality === "VERY UNHEALTHY" ||
          activeEffects.air_quality === "HAZARDOUS") && <Smoke />}
      </>
    );
  };

  /* 🌍 EARTHQUAKE WRAPPER */
  const wrapWithEarthquake = (content) => {
    if (activeEffects?.earthquake_risk === "HIGH") {
      return <Earthquake>{content}</Earthquake>;
    }
    return content;
  };

  const getAQIAdvice = (aqi) => {
  switch (aqi) {
    case "GOOD":
      return {
        title: "Air Quality is Good",
        tips: ["Safe for outdoor activities", "Keep ventilation open"],
        risks: ["No significant health risk"],
      };

    case "MODERATE":
      return {
        title: "Moderate Air Quality",
        tips: ["Limit long outdoor exposure", "Stay hydrated"],
        risks: ["Mild irritation for sensitive people"],
      };

    case "UNHEALTHY":
      return {
        title: "Unhealthy Air Quality",
        tips: ["Wear mask", "Avoid outdoor activities", "Use air purifier"],
        risks: ["Respiratory issues", "Asthma risk"],
      };

    case "VERY UNHEALTHY":
      return {
        title: "Very Unhealthy Air",
        tips: ["Stay indoors", "Seal windows", "Use purifier"],
        risks: ["Severe lung irritation", "Heart stress"],
      };

    case "HAZARDOUS":
      return {
        title: "Hazardous Air",
        tips: ["Do not go outside", "Emergency precautions required"],
        risks: ["Serious respiratory diseases", "Long-term lung damage"],
      };

    default:
      return null;
  }
};

const getRainAdvice = (risk) => {
  switch (risk) {
    case "LOW":
      return {
        title: "Low Rainfall",
        tips: ["Normal conditions", "No flood risk"],
        risks: ["Water scarcity possible"],
      };

    case "MEDIUM":
      return {
        title: "Moderate Rainfall",
        tips: ["Drive carefully", "Avoid waterlogged areas"],
        risks: ["Minor flooding", "Infections due to water"],
      };

    case "HIGH":
      return {
        title: "Heavy Rainfall Alert",
        tips: ["Stay indoors", "Avoid travel", "Prepare emergency kit"],
        risks: ["Flooding", "Water-borne diseases (cholera, typhoid)"],
      };

    default:
      return null;
  }
};

const getEarthquakeAdvice = (risk) => {
  switch (risk) {
    case "LOW":
      return {
        title: "Low Earthquake Risk",
        tips: ["No immediate action needed"],
        risks: ["Minimal structural risk"],
      };

    case "HIGH":
      return {
        title: "High Earthquake Risk",
        tips: [
          "Drop, Cover, Hold",
          "Stay away from windows",
          "Keep emergency kit ready",
        ],
        risks: ["Building collapse", "Injuries", "Infrastructure damage"],
      };

    default:
      return null;
  }
};
  
const getTempAdvice = (status) => {
  switch (status) {
    case "COLD":
      return {
        title: "Cold Weather",
        tips: ["Wear warm clothes", "Avoid cold exposure"],
        risks: ["Hypothermia", "Cold, flu"],
      };

    case "NORMAL":
      return {
        title: "Normal Temperature",
        tips: ["Maintain hydration", "Regular activity"],
        risks: ["No major risk"],
      };

    case "EXTREME HEAT":
      return {
        title: "Extreme Heat Warning",
        tips: ["Stay hydrated", "Avoid sunlight", "Use cooling"],
        risks: ["Heatstroke", "Dehydration", "Skin burns"],
      };

    default:
      return null;
  }
};

const getRiskColor = (level) => {
  if (!level) return "neutral";

  level = level.toUpperCase();

  // 🔴 HIGH / DANGEROUS
  if (
    level.includes("HIGH") ||
    level.includes("HAZARDOUS") ||
    level.includes("UNHEALTHY") ||
    level.includes("EXTREME")
  ) {
    return "red";
  }

  // 🟡 MEDIUM
  if (
    level.includes("MEDIUM") ||
    level.includes("MODERATE")
  ) {
    return "yellow";
  }

  // 🟢 SAFE
  if (
    level.includes("LOW") ||
    level.includes("GOOD") ||
    level.includes("NORMAL") ||
    level.includes("COLD")
  ) {
    return "green";
  }

  return "neutral";
};

const getResources = (result) => {
  if (!result) return [];

  let resources = [];

  // 🌧 Flood
  if (result.flood_risk === "HIGH") {
    resources.push(
      "Rescue boats",
      "Emergency shelters",
      "Food & clean water supply"
    );
  }

  if (result.flood_risk === "MEDIUM") {
    resources.push(
      "Drainage management teams",
      "Traffic control units"
    );
  }

  // 🌋 Earthquake
  if (result.earthquake_risk === "HIGH") {
    resources.push(
      "Search & rescue teams",
      "Medical emergency units",
      "Temporary shelters"
    );
  }

  // 🌫 AQI
  if (
    result.air_quality === "UNHEALTHY" ||
    result.air_quality === "VERY UNHEALTHY" ||
    result.air_quality === "HAZARDOUS"
  ) {
    resources.push(
      "N95 masks",
      "Air purifiers",
      "Health advisory teams"
    );
  }

  // 🌡 Temperature
  if (result.weather_status === "EXTREME HEAT") {
    resources.push(
      "Cooling centers",
      "Water distribution units",
      "Medical hydration support"
    );
  }

  if (result.weather_status === "COLD") {
    resources.push(
      "Warm shelters",
      "Blankets & heating support",
      "Medical aid for cold exposure"
    );
  }

  return resources;
};

const getAIExplanation = (result, inputs) => {
  if (!result) return [];

  let reasons = [];

  // 🌧 Rain
  if (inputs.rainfall > 120) {
    reasons.push("Heavy rainfall increases flood risk significantly.");
  } else if (inputs.rainfall > 70) {
    reasons.push("Moderate rainfall may cause waterlogging.");
  }

  // 🌋 Earthquake
  if (inputs.earthquake > 6) {
    reasons.push("High earthquake magnitude increases structural damage risk.");
  }

  // 🌫 AQI
  if (inputs.aqi > 200) {
    reasons.push("Poor air quality can cause respiratory issues.");
  } else if (inputs.aqi > 100) {
    reasons.push("Moderate AQI may affect sensitive groups.");
  }

  // 🌡 Temperature
  if (inputs.temperature > 40) {
    reasons.push("Extreme heat can cause dehydration and heatstroke.");
  }

  if (inputs.temperature < 5) {
    reasons.push("Low temperature may lead to cold-related illnesses.");
  }

  return reasons;
};

/*return (
  <>*/
  return (
    <div className="page-container">
    {/* EFFECT LAYER */}
    {renderEffects()}
    <div>
    {/* MAIN UI */}
    {wrapWithEarthquake(
      <div className="app-container">
        <h1 className="title">
          <span className="earth">🌍</span> Digital Twin Earth
        </h1>
        <button
        className="mute-btn"
        onClick={() => setIsMuted(!isMuted)}
        >
        {isMuted ? "🔇" : "🔊"}
        </button>
        {/* INPUT GRID */}
        <div className="grid">
          <div className="card">
            <h3>Rainfall</h3>
            <input
              type="number"
              name="rainfall"
              placeholder="0 - 300 mm"
              value={inputs.rainfall}
              onChange={handleChange}
            />
          </div>

          <div className="card">
            <h3>Earthquake</h3>
            <input
              type="number"
              name="earthquake"
              placeholder="0 - 10 Magnitude"
              value={inputs.earthquake}
              onChange={handleChange}
            />
          </div>

          <div className="card">
            <h3>AQI</h3>
            <input
              type="number"
              name="aqi"
              placeholder="0 - 500 AQI"
              value={inputs.aqi}
              onChange={handleChange}
            />
          </div>

          <div className="card">
            <h3>Temperature</h3>
            <input
              type="number"
              name="temperature"
              placeholder="-20 to 60 °C"
              value={inputs.temperature}
              onChange={handleChange}
            />
          </div>
        </div>
  
        {/* BUTTON */}
        <button className="run-btn" onClick={handleSimulation}>
          <div className="btn-inner">
            {loading ? "Simulating..." : "Run Simulation"}
          </div>
        </button>

        {/* RESULTS */}
        {result && (
  <div className="result">
    <h2>📊 Analysis</h2>

    {/* 🌧 Rain */}
    {result.flood_risk && (
      <>
        <div className={`risk-card ${getRiskColor(result.flood_risk)}`}>
          🌧 Flood Risk: <b>{result.flood_risk}</b>
        </div>

        {getRainAdvice(result.flood_risk) && (
          <div className="advice-box">
            <h4>{getRainAdvice(result.flood_risk).title}</h4>

            <p><b>Precautions:</b></p>
            <ul>
              {getRainAdvice(result.flood_risk).tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>

            <p><b>Risks:</b></p>
            <ul>
              {getRainAdvice(result.flood_risk).risks.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    )}

    {/* 🌋 Earthquake */}
    {result.earthquake_risk && (
      <>
        <div className={`risk-card ${getRiskColor(result.earthquake_risk)}`}>
          🌋 Earthquake Risk: <b>{result.earthquake_risk}</b>
        </div>

        {getEarthquakeAdvice(result.earthquake_risk) && (
          <div className="advice-box">
            <h4>{getEarthquakeAdvice(result.earthquake_risk).title}</h4>

            <p><b>Precautions:</b></p>
            <ul>
              {getEarthquakeAdvice(result.earthquake_risk).tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>

            <p><b>Risks:</b></p>
            <ul>
              {getEarthquakeAdvice(result.earthquake_risk).risks.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    )}

    {/* 🌫 AQI */}
    {result.air_quality && (
      <>
        <div className={`risk-card ${getRiskColor(result.air_quality)}`}>
          🌫 Air Quality: <b>{result.air_quality}</b>
        </div>

        {getAQIAdvice(result.air_quality) && (
          <div className="advice-box">
            <h4>{getAQIAdvice(result.air_quality).title}</h4>

            <p><b>Precautions:</b></p>
            <ul>
              {getAQIAdvice(result.air_quality).tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>

            <p><b>Risks:</b></p>
            <ul>
              {getAQIAdvice(result.air_quality).risks.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    )}

    {/* 🌡 Temperature */}
    {result.weather_status && (
      <>
        <div className={`risk-card ${getRiskColor(result.weather_status)}`}>
          🌡 Weather: <b>{result.weather_status}</b>
        </div>

        {getTempAdvice(result.weather_status) && (
          <div className="advice-box">
            <h4>{getTempAdvice(result.weather_status).title}</h4>

            <p><b>Precautions:</b></p>
            <ul>
              {getTempAdvice(result.weather_status).tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>

            <p><b>Risks:</b></p>
            <ul>
              {getTempAdvice(result.weather_status).risks.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    )}
    {getResources(result).length > 0 && (
  <div className="resource-box">
    <h3>🚑 Recommended Resources</h3>

    <ul>
      {getResources(result).map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)}
{getAIExplanation(result, inputs).length > 0 && (
  <div className="ai-box">
    <h3>🧠 Why this result?</h3>

    <ul>
      {getAIExplanation(result, inputs).map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)}
  </div>
)}
        {/* MAP */}
        <div className="map">
          <MapView risk={result} />
        </div>
      </div>
    )}
  </div>
  </div>
  
);
}
export default Home;
