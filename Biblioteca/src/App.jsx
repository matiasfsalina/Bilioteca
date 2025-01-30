import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Gestor from "./components/Gestor";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Gestor" element={<Gestor />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default App;



