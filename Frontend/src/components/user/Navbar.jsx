import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, changetoDarkMode, changetoLightMode } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Sun, Moon } from "../svg/svgIcons";
import "../../assets/style/navbar.css";

const Navbar = () => {
  const userData = useSelector((state) => state.user.userData);
  const darkMode = useSelector((state) => state.user.darkMode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    document.body.classList.remove("dark-mode");
    navigate("/");
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode])

  return (
    <div className={darkMode ? "navbar-dark" : "navbar-light"}>
      <ul className={darkMode ? "nav-list-dark" : "nav-list"}>
        <li><u>Home</u></li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
      <div className="right-container">
        <div className="theme">
          {darkMode ? (<span className="moon" onClick={() => dispatch(changetoLightMode())}><Moon /></span>) : (<span className="sun" onClick={() => dispatch(changetoDarkMode())}><Sun /></span>)}
        </div>
        <div className={darkMode ? "logout-btn-dark" : "logout-btn"} onClick={() => handleLogout()}>
          {userData.profileURL ? (<div className="cirle" style={{ backgroundImage: `url(/src/public/${userData.profileURL})` }}></div>) : (
            <div className="cirle">
              <p>{userData.name[0]}</p>
            </div>
          )}
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;