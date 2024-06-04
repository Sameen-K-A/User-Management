import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../assets/style/login.css";

const Adminlogin = () => {
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="login-center">
          <h1>Admin Login</h1>
          <form className="form">
            <input type="text" placeholder="Email" className="input" autoComplete="email" />
            <input type="password" placeholder="Password" className="input" autoComplete="current-password" />
            <button type="submit" className="button">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Adminlogin;