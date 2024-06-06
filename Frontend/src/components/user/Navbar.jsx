import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import "../../assets/style/navbar.css";

const Navbar = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  }

  return (
    <div className="navbar">
      <ul className="nav-list">
        <li><u>Home</u></li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
      <div className="logout-btn" onClick={() => handleLogout()}>
        {userData.profileURL ? (
          <div className="cirle" style={{ backgroundImage: `url(/src/public/${userData.profileURL})` }}></div>
        ) : (
          <div className="cirle">
            <p>{userData.name[0]}</p>
          </div>
        )}
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Navbar;