import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../common/Navbar";
import Search from "../admin/Search";
import { Blockbtn, Unblockbtn, Editbtn } from "../svg/svgIcons";
import confirmAlert from "../../assets/sweetAlert/confirmAlert";
import { blockUser, unblockUser } from "../../redux/admin/adminThunks";
import "../../assets/style/adminhome.css";

const Adminhome = () => {
  const usersList = useSelector((state) => state.adminData.filteredUsers);
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

  return (
    <>
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
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td className="edit"><Editbtn /></td>
                      {user.isBlocked == false ? (
                        <td className="delete" onClick={() => { handleBlockUser(user._id) }}><Unblockbtn /></td>
                      ) : (
                        <td className="delete" onClick={() => { handleUnBlockUser(user._id) }}><Blockbtn /></td>
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