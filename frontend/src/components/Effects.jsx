import React from "react";
import { motion } from "framer-motion";

/* 🌧 RAIN */
export const LightRain = () => {
  return (
    <>
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "fixed",
            top: "-10px",
            left: `${Math.random() * 100}%`,
            width: "2px",
            height: "15px",
            background: "rgba(173,216,230,0.5)",
            zIndex: 100,
          }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 0.8,
            repeat: 25,
            delay: Math.random(),
          }}
        />
      ))}
    </>
  );
};
export const HeavyRain = () => {
  return (
    <>
      {/* Dark Cloud Overlay */}
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          zIndex: 40,
        }}
      />

      {/* Rain */}
      {[...Array(120)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "fixed",
            top: "-10px",
            left: `${Math.random() * 100}%`,
            width: "2px",
            height: "30px",
            background: "rgba(173,216,230,0.9)",
            zIndex: 100,
          }}
          animate={{ y: "100vh" }}
          transition={{
            duration: 0.3,
            repeat: 25,
            delay: Math.random(),
          }}
        />
      ))}

      {/* Lightning Flash */}
      <motion.div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          background: "white",
          zIndex: 120,
        }}
        animate={{ opacity: [0, 0.8, 0] }}
        transition={{
          duration: 0.2,
          repeat: 25,
          repeatDelay: 3,
        }}
      />
    </>
  );
};

/* ❄️ SNOW */
export const Snow = () => {
  return (
    <>
      {[...Array(80)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "fixed",
            top: "-10px",
            left: `${Math.random() * 100}%`,
            fontSize: "10px",
            color: "white",
            zIndex: 100,
          }}
          animate={{ y: "100vh", x: [0, 20, -20, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: Math.random(),
          }}
        >
          ❄
        </motion.div>
      ))}
    </>
  );
};

/* ☀️ HEAT */
export const Heat = () => {
  return (
    <motion.div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        background:
          "radial-gradient(circle, rgba(255,80,0,0.7), transparent)",
        zIndex: 80,
      }}
      animate={{ opacity: [0.5, 0.9, 0.5] }}
      transition={{ duration: 1, repeat: 10 }} // ~10 sec
    />
  );
};

/* 🌍 EARTHQUAKE SHAKE */
export const Earthquake = ({ children }) => {
  return (
    <motion.div
      animate={{
        x: [0, -10, 10, -10, 10, 0],
        y: [0, -5, 5, -5, 5, 0],
      }}
      transition={{
        duration: 0.4,
        repeat: 25, // ~10 seconds
      }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

/* 🌫 SMOKE (AQI) */
export const Smoke = () => {
  return (
    <>
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "fixed",
            bottom: 0,
            left: `${Math.random() * 100}%`,
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(120,120,120,0.4)",
            filter: "blur(15px)",
          }}
          animate={{ y: "-100vh", opacity: [0.4, 0.8, 0] }}
          transition={{
            duration: 8,
            repeat: 25,
            delay: Math.random(),
          }}
        />
      ))}
    </>
  );
};

export const Breeze = () => {
  return (
    <>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "fixed",
            top: `${Math.random() * 100}%`,
            left: "-50px",
            fontSize: "18px",
            zIndex: 90,
          }}
          animate={{ x: "120vw", rotate: [0, 180, 360] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: Math.random(),
          }}
        >
          🍃
        </motion.div>
      ))}
    </>
  );
};