import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./components/user/Home";
import Adminlogin from "./components/admin/Adminlogin";
import Adminhome from "./components/admin/Adminhome";
import IsUser from "./components/auth/userAuth/isUser";
import IsAdmin from "./components/auth/adminAuth/isAdmin";
import Error404 from "./components/common/404";
import { ErrorBoundary } from "react-error-boundary"
import "./assets/style/app.css";

function App() {
  return (
    <>
      <ErrorBoundary fallback={<Error404 />}>
        <Router>
          <Routes>
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Home" element={<IsUser><Home /></IsUser>} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Adminlogin />} />
            <Route path="/admin/home" element={<IsAdmin><Adminhome /></IsAdmin>} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </>
  );
}

export default App;