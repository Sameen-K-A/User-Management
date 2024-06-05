import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { registerUser } from "../../redux/user/userThunk";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    const response = await registerUser({ name, email, phone, password, confirmPassword, toast });
    if(response === "success"){
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="login-center">
          <h1>Register</h1>
          <form className="form" onSubmit={(e) => handleRegistration(e)}>
            <input type="text" placeholder="Name" className="input" autoComplete="name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Email" className="input" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Phone number" className="input" autoComplete="tel" onChange={(e) => setPhone(e.target.value)} />
            <input type="password" placeholder="Password" className="input" autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} />
            <input type="password" placeholder="Confirm Password" className="input" autoComplete="new-password" onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit" className="button">Register</button>
            <p className="link">Already have an account <Link to={"/login"}>Login</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;