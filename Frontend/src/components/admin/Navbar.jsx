import React from "react";
import { Logout } from "../svg/svgIcons";
import "../../assets/style/navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li><u>Home</u></li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
      <div className="logout-btn">
        <Logout />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Navbar;