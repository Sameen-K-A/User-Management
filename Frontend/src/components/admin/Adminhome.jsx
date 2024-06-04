import React from "react";
import Navbar from "./Navbar";
import Search from "../admin/Search";
import { Blockbtn, Unblockbtn, Editbtn } from "../svg/svgIcons";
import { ToastContainer, toast } from "react-toastify";
import "../../assets/style/adminhome.css";

const Adminhome = () => {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <div className="main">
        <h1>User List</h1>
        <Search />
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
            <tr className="childDivWrapper">
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td className="edit" ><Editbtn /></td>
              <td className="delete"><Unblockbtn /></td>
              <td className="delete"><Blockbtn /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Adminhome;