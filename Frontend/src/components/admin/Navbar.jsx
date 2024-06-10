import React from "react";
import { Logout } from "../svg/svgIcons";
import { logoutAdmin } from "../../redux/admin/adminSlice";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import "../../assets/style/adminNavbar.css";

const Navbar = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutAdmin());
    navigate("/admin");
  }
  return (
    <div className="navbar">
      <ul className="nav-list">
        <li><u>Users</u></li>
        <li>Orders</li>
        <li>Products</li>
        <li>Sales report</li>
      </ul>
      <div className="logout-btn" onClick={() => handleLogout()}>
        <Logout />
        <span>Logout</span>
      </div>
    </div>
  );
});

export default Navbar;