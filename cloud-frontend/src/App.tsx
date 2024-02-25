import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import RegistrationForm from "./components/RegistrationForm";
import AuthenticationForm from "./components/AuthenticationForm";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="registration" element={<RegistrationForm />} />
        <Route path="authentication" element={<AuthenticationForm />} />
        <Route path="admin/:userId" element={<Admin />} />
        {/* <Route path="user/:userId" element={<User />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
