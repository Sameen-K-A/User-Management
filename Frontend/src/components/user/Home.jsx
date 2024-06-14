import React, { useEffect, useRef, useState } from "react";
import Navbar from "../user/Navbar";
import { Camera, Editbtn } from "../svg/svgIcons";
import { useSelector } from "react-redux";
import { editProfile } from "../../redux/user/userThunk";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/style/home.css";

const Home = () => {
  const userData = useSelector((state) => state.user.userData);
  const darkMode = useSelector((state) => state.user.darkMode);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [edit, setEdit] = useState(false);
  const imageIconReference = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setEdit(false);
  }, [userData]);


  const handleEditOpen = (username, userphone) => {
    setName(username);
    setPhone(userphone);
    setEdit(true);
  }

  const handleSumbit = async (event, userID) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("userID", userID);
    formData.append("name", name);
    formData.append("phone", phone);
    image && formData.append("newImage", image)
    dispatch(editProfile({ formData, name, phone, image, toast }));
  }

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container">
        <div className={darkMode ? "card-container dark" : "card-container"}>
          {!edit ? (
            <>
              <div className="edit-btn-wrapper" onClick={() => handleEditOpen(userData.name, userData.phone)}>
                <Editbtn />
              </div>
              <div className={darkMode ? "dark-circle" : "circle"} style={{ backgroundImage: `url(/src/public/${userData.profileURL})` }} />
              <div className="details">
                {userData && (
                  <>
                    <p><span>Name : </span>{userData.name}</p>
                    <p><span>Email : </span>{userData.email}</p>
                    <p><span>Phone Number : </span>{userData.phone}</p>
                  </>
                )}
              </div>
            </>
          ) : (
            <form onSubmit={(e) => handleSumbit(e, userData._id)}>
              <div className={darkMode ? "dark-circle" : "circle"} style={image ? { backgroundImage: `url(${URL.createObjectURL(image)})` } : { backgroundImage: `url(/src/public/${userData.profileURL})` }} >
                <input type="file" hidden ref={imageIconReference} onChange={(e) => setImage(e.target.files[0])} accept=".png, .jpeg, .jpg" />
                <div className={darkMode ? "circle-btn-dark" : "circle-btn"} onClick={() => imageIconReference.current.click()}><Camera /></div>
              </div>
              <div className="details">
                {userData && (
                  <>
                    <p><span>Name : </span><input className={darkMode ? "editInput-dark" : "editInput"} defaultValue={userData.name} type="text" onChange={(e) => setName(e.target.value)} /></p>
                    <p><span>Phone Number : </span><input className={darkMode ? "editInput-dark" : "editInput"} defaultValue={userData.phone} type="text" onChange={(e) => setPhone(e.target.value)} /></p>
                  </>
                )}
              </div>
              <div className={darkMode ? "saveandcancel dark-btn" : "saveandcancel"}>
                <button onClick={() => { setEdit(false); setImage(null) }}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;