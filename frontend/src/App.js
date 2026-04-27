import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Footer from "./components/Footer";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
          >
            <Home />
          </motion.div>
        }/>

        <Route path="/dashboard" element={
          <motion.div
            initial={{ opacity: 0,  y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1,  y: 0, filter: "blur(0px)"}}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <Dashboard />
          </motion.div>
        }/>

        <Route path="/about" element={
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <About />
          </motion.div>
        }/>

      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">About</Link>
        </nav>

        <div className="content">
          <AnimatedRoutes />
        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;