import React, { useState } from "react";
import { Link } from "react-router-dom";
import { localhostURL } from "../../services/url";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setConfpassword] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    const nameRegex = /^[a-zA-Z\s]{3,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (name.trim() === "" || email.trim() === "" || phone.trim() === "" || password.trim() === "" || confpassword.trim() === "") {
      toast.warning("All the fields are required!", { hideProgressBar: true, autoClose: 3000 });
    } else if (!nameRegex.test(name.trim())) {
      toast.warning("Name must be between 3 to 20 characters and contain only letters!", { hideProgressBar: true, autoClose: 3000 });
    } else if (!emailRegex.test(email.trim())) {
      toast.warning("Invalid email address!", { hideProgressBar: true, autoClose: 3000 });
    } else if (!phoneRegex.test(phone.trim())) {
      toast.warning("Invalid Indian phone number!", { hideProgressBar: true, autoClose: 3000 });
    } else if (password.trim().length < 8) {
      toast.warning("Password must be at least 8 characters long!", { hideProgressBar: true, autoClose: 3000 });
    } else if (password.trim() !== confpassword.trim()) {
      toast.warning("Password and confirm password do not match!", { hideProgressBar: true, autoClose: 3000 });
    } else {
      try {
        const response = await axios.post(`${localhostURL}/registerPost`, { name, email, phone, password, confpassword });
        if (response.data === "UserExist") {
          toast.error("User already exists", { hideProgressBar: true, autoClose: 3000 })
        } else {
          console.log(response.data);
        }
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
          <h1>Register</h1>
          <form className="form" onSubmit={(e) => handleRegister(e)}>
            <input type="text" placeholder="Name" className="input" defaultValue={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Email" className="input" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Phone number" className="input" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="password" placeholder="Password" className="input" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" className="input" defaultValue={confpassword} onChange={(e) => setConfpassword(e.target.value)} />
            <button type="submit" className="button">Register</button>
            <p className="link">Already have an account <Link to={"/login"}>Login</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;