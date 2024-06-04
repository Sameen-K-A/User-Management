import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/login.css";

const Login = () => {
  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="login-center">
          <h1>Login</h1>
          <form className="form">
            <input type="text" placeholder="Email" className="input" autoComplete="email" />
            <input type="password" placeholder="Password" className="input" autoComplete="current-password" />
            <button type="submit" className="button">Login</button>
            <p className="link">Dont't have an account <Link to={"/register"}>Register</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;