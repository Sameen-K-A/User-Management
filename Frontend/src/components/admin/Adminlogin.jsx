import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../../redux/admin/adminThunks";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/style/login.css";
import { useNavigate } from "react-router-dom";

const Adminlogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.admin.jwtToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/admin/home")
  }, [token]);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login({ email, password, toast }));
  }

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="login-center">
          <h1>Admin Login</h1>
          <form className="form" onSubmit={(e) => handleLogin(e)}>
            <input type="text" placeholder="Email" className="input" autoComplete="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="input" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="button">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Adminlogin;