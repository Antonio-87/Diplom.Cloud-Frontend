import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="registration" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;
