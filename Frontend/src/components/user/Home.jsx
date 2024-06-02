import React from "react";
import Navbar from "../common/Navbar";
import { Camera } from "../svg/svgIcons";
import "../../assets/style/home.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card-container">
          <div className="circle">
            <div className="circle-btn"><Camera /></div>
          </div>
          <div className="details">
            <p><span>Name :</span> Sameen K A</p>
            <p><span>Email :</span> sameensameen60@gmail.com</p>
            <p><span>phone Number :</span> 9562718577</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;