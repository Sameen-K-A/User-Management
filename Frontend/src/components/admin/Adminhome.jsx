import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Search from "../admin/Search";
import { Delete, Editbtn } from "../svg/svgIcons";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../redux/admin/adminThunks";
import "../../assets/style/adminhome.css";

const Adminhome = () => {

  const usersData = useSelector((state) => state.admin.usersList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [])

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
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td className="edit" ><Editbtn /></td>
                    <td className="delete"><Delete /></td>
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