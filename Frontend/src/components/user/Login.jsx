import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginVerification } from "../../redux/user/userThunk";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginVerification({ email, password, toast }));
  }

  useEffect(() => {
    if (userData) {
      navigate("/home");
    }
  }, [userData])

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="login-center">
          <h1>Login</h1>
          <form className="form" onSubmit={(e) => handleLogin(e)}>
            <input type="text" placeholder="Email" className="input" onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            <input type="password" placeholder="Password" className="input" onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            <button type="submit" className="button">Login</button>
            <p className="link">Dont't have an account <Link to={"/register"}>Register</Link></p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;