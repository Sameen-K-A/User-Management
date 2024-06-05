import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Search from "../admin/Search";
import { Delete, Editbtn } from "../svg/svgIcons";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, deleteUser } from "../../redux/admin/adminThunks";
import { editName } from "../../redux/admin/adminThunks";
import confirmAlert from "../../assets/sweetAlert/confirmAlert";
import "../../assets/style/adminhome.css";

const Adminhome = () => {

  const [editUserID, setEditUserID] = useState(null);
  const [editedUserNewName, setEditedUserNewName] = useState("");
  const usersData = useSelector((state) => state.admin.usersList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [])

  const handleDeleteUser = (id) => {
    confirmAlert("Do you want to delete this user permanently?")
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteUser(id));
        }
      })
  }

  const openEditInput = (id, name) => {
    setEditUserID(id);
    setEditedUserNewName(name);
  }

  const handleSaveEditedname = (id, name) => {
    confirmAlert("Do you want save the changes")
      .then((result) => {
        if (result.isConfirmed) {
          if (editedUserNewName.trim() == "") {
            toast.error("Enter a valid name. The name must contain at least 3 characters", { autoClose: 3000, hideProgressBar: true });
          } else if (name == editedUserNewName.trim()) {
            toast.error("No changes found", { autoClose: 2500, hideProgressBar: true });
            setEditUserID(null)
          } else {
            dispatch(editName({ id, name: editedUserNewName }));
            setEditUserID(null)
          }
        }
      })
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="main">
        <h1>Users</h1>
        <Search />
        {usersData.length == 0 ? (
          <h3>No users have been found.</h3>
        ) : (
          <table className="styled-table">
            <thead>
              <tr>
                <th className="heading">Name</th>
                <th className="heading">Email</th>
                <th className="heading">Phone</th>
                <th className="heading edit">Edit</th>
                <th className="heading delete">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => {
                return (
                  <tr key={user._id} className="childDivWrapper">
                    {editUserID === user._id ? (
                      <>
                        <td><input className="editnameInput" type="text" defaultValue={user.name} onChange={(e) => setEditedUserNewName(e.target.value)} /></td>
                        <td></td><td></td>
                        <td><button className="cancelName" onClick={() => setEditUserID(null)}>Cancel</button></td>
                        <td><button className="saveName" onClick={() => handleSaveEditedname(user._id, user.name)}>Save</button></td>
                      </>
                    ) : (
                      <>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td className="edit" onClick={() => openEditInput(user._id, user.name)}><Editbtn /></td>
                        <td className="delete" onClick={() => handleDeleteUser(user._id)}><Delete /></td>
                      </>

                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Adminhome;