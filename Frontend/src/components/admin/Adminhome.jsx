import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../common/Navbar";
import Search from "../admin/Search";
import { Blockbtn, Unblockbtn, Editbtn } from "../svg/svgIcons";
import confirmAlert from "../../assets/sweetAlert/confirmAlert";
import { blockUser, unblockUser, editUser } from "../../redux/admin/adminThunks";
import { ToastContainer, toast } from "react-toastify";
import "../../assets/style/adminhome.css";

const Adminhome = () => {
  const usersList = useSelector((state) => state.adminData.filteredUsers);
  const [editNameUserID, setEditNameUserID] = useState(null);
  const [editedNewName, setEditedNewName] = useState("")
  const dispatch = useDispatch();

  const handleBlockUser = async (id) => {
    const result = await confirmAlert("Do you want to block this user?");
    if (result.isConfirmed) {
      dispatch(blockUser(id));
    }
  }
  const handleUnBlockUser = async (id) => {
    const result = await confirmAlert("Do you want to un-block this user?");
    if (result.isConfirmed) {
      dispatch(unblockUser(id));
    }
  }

  const handleEditUser = async (id) => {
    const result = await confirmAlert("Do you want to save changes?");
    if (result.isConfirmed) {
      if (editedNewName.trim() === "") {
        toast.error("Name must consist at least three characters.", { hideProgressBar: true, autoClose: 3000, position: "bottom-right" });
        return;
      }
      const checkAlreadyExist = usersList.filter((user) => {
        return user._id !== editNameUserID && user.name.toLowerCase() === editedNewName.toLowerCase();
      });
      if (checkAlreadyExist.length > 0) {
        toast.error("Name already exists, please try another name", { hideProgressBar: true, autoClose: 3000, position: "bottom-right" });
        return;
      } else {
        dispatch(editUser({ id: id, newName: editedNewName }));
        setEditNameUserID(null)
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="main">
        <h1>User List</h1>
        <Search />
        {!usersList.length ? (
          <h1>No users founded</h1>
        ) : (
          <>
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
                {usersList.map((user) => {
                  return (
                    <tr key={user.email} className="childDivWrapper">
                      {editNameUserID === user._id ? (
                        <>
                          <td><input className="editnameInput" type="text" defaultValue={user.name} onChange={(e) => setEditedNewName(e.target.value)} /></td>
                          <td></td><td></td>
                          <td><button className="cancelName" onClick={() => setEditNameUserID(null)}>Cancel</button></td>
                          <td><button className="saveName" onClick={() => handleEditUser(user._id)}>Save</button></td>
                        </>
                      ) : (
                        <>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td className="edit" onClick={() => { setEditNameUserID(user._id) }}><Editbtn /></td>
                          {user.isBlocked == false ? (
                            <td className="delete" onClick={() => { handleBlockUser(user._id) }}><Unblockbtn /></td>
                          ) : (
                            <td className="delete" onClick={() => { handleUnBlockUser(user._id) }}><Blockbtn /></td>
                          )}
                        </>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
};

export default Adminhome;