import React, { useEffect, useRef, useState } from "react";
import Navbar from "../common/Navbar";
import { Camera } from "../svg/svgIcons";
import "../../assets/style/home.css";
import axios from "axios";
import { localhostURL } from "../../services/url";

const Home = () => {

  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState(null);
  const imageFileRef = useRef(null);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("myData"));
    setUserData(data);
  }, []);

  const openImageFile = () => {
    imageFileRef.current.click();
  }

  const handleImageChange = async (event, id) => {
    const newImg = event.target.files[0];
    if (newImg) {
      const imgURL = URL.createObjectURL(newImg);
      setImage(imgURL);
      const response = await axios.post(`${localhostURL}/profileImgEdit`, { imgURL, id });
      console.log(response.data);
    }
  }

  return (
    <>
      <Navbar />
      {userData && userData.name ? (
        <div className="container">
          <div className="card-container">
            <div className="circle" style={{ backgroundImage: image ? `url(${image})` : `url(${userData.profileURL})` }}>
              <div className="circle-btn" onClick={openImageFile}><Camera /></div>
              <input type="file" ref={imageFileRef} style={{ display: "none" }} onChange={(e) => handleImageChange(e, userData._id)} accept=".jpg,.jpeg,.png" />
            </div>
            <div className="details">
              <p><span>Name :</span>{userData.name}</p>
              <p><span>Email :</span>{userData.email}</p>
              <p><span>phone Number :</span>{userData.phone}</p>
            </div>
          </div>
        </div>
      ) : ("")}
    </>
  );
};

export default Home;