import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/login.css";

const Register = () => {
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="login-center">
          <h1>Register</h1>
          <form className="form">
            <input type="text" placeholder="Name" className="input" autoComplete="name" />
            <input type="text" placeholder="Email" className="input" autoComplete="email" />
            <input type="text" placeholder="Phone number" className="input" autoComplete="tel" />
            <input type="password" placeholder="Password" className="input" autoComplete="new-password" />
            <input type="password" placeholder="Confirm Password" className="input" autoComplete="new-password" />
            <button type="submit" className="button">Register</button>
            <p className="link">Already have an account <Link to={"/login"}>Login</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;