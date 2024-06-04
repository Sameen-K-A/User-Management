import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from "react-toastify";
import { loginPost } from "../../redux/user/userThunk"
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let userData = useSelector((state) => state.myData)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast.warning("Fill all the fields!", { hideProgressBar: true, autoClose: 3000, position: "bottom-right" });
    } else {
      userData = await dispatch(loginPost({ email, password }));
      if (userData.payload == "user not found") {
        toast.error("User not found", { hideProgressBar: true, autoClose: 3000, position: "bottom-right" });
        return
      } else if (userData.payload == "user is blocked") {
        toast.error("Your account is blocked", { hideProgressBar: true, autoClose: 3000, position: "bottom-right" });
        return
      } else if (userData.payload == "wrong password") {
        toast.error("Password is wrong", { hideProgressBar: true, autoClose: 3000, position: "bottom-right" });
        return
      } else {
        navigate("/home")
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