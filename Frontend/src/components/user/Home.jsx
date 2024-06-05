import React from "react";
import Navbar from "../user/Navbar";
import { Camera } from "../svg/svgIcons";
import { useSelector } from "react-redux";
import "../../assets/style/home.css";

const Home = () => {
  const userData = useSelector((state) => state.user.userData);
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card-container">
          <div className="circle">
            <div className="circle-btn"><Camera /></div>
          </div>
          <div className="details">
            {userData && (
              <>
                <p><span>Name : </span>{userData.name}</p>
                <p><span>Email : </span>{userData.email}</p>
                <p><span>phone Number : </span>{userData.phone}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;