import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../redux/admin/adminThunks";
import "../../assets/style/login.css";

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminEmail = "admin123@gmail.com";
  const adminPassword = "000";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = (event) => {
    event.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.warning("Fill all the fields!", { hideProgressBar: true, autoClose: 3000 });
    } else if (!emailRegex.test(email.trim())) {
      toast.warning("Enter valid email address!", { hideProgressBar: true, autoClose: 3000 });
    } else if (adminEmail !== email) {
      toast.warning("Email not found", { hideProgressBar: true, autoClose: 3000 });
    } else if (adminPassword !== password) {
      toast.warning("Wrong password! please check", { hideProgressBar: true, autoClose: 3000 });
    } else {
      dispatch(fetchUsers());
      navigate("/admin/home");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="login-center">
          <h1>Admin Login</h1>
          <form className="form" onSubmit={(e) => handleLogin(e)}>
            <input type="text" placeholder="Email" className="input" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="input" defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="button">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Adminlogin;