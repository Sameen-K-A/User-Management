import React from "react";
import { Logout } from "../svg/svgIcons";
import { useDispatch } from "react-redux";
import { adminLogout } from "../../redux/admin/adminSlice";
import { useNavigate } from "react-router-dom";
import "../../assets/style/navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(adminLogout());
    navigate("/admin");
  }

  return (
    <div className="navbar">
      <ul className="nav-list">
        <li><u>Home</u></li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
      <div className="logout-btn" onClick={() => logout()}>
        <Logout />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Navbar;