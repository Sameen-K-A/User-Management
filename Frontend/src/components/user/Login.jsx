import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { localhostURL } from "../../services/url"
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.warning("Fill all the fields!", { hideProgressBar: true, autoClose: false });
    } else {
      try {
        const response = await axios.post(localhostURL, { email, password })
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="login-center">
          <h1>Login</h1>
          <form className="form" onSubmit={(e) => handleLogin(e)}>
            <input type="text" placeholder="Email" className="input" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="input" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="button">Login</button>
            <p className="link">Dont't have an account <Link to={"/register"}>Register</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;