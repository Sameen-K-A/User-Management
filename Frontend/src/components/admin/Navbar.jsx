import React from "react";
import { Logout } from "../svg/svgIcons";
import { logoutAdmin } from "../../redux/admin/adminSlice";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import "../../assets/style/navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin");
  }
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li><u>Home</u></li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
      <div className="logout-btn" onClick={() => handleLogout()}>
        <Logout />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Navbar;