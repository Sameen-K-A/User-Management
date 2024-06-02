import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./components/user/Home";
import Adminlogin from "./components/admin/Adminlogin";
import Adminhome from "./components/admin/Adminhome";
import "./assets/style/app.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Adminlogin />} />
          <Route path="/admin/home" element={<Adminhome />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;