import { createAsyncThunk } from "@reduxjs/toolkit";
import { localhostURL } from "../../services/url";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
   'adminData/fetchUsers',
   async () => {
      const response = await axios.get(`${localhostURL}/admin/userlist`);
      return response.data
   }
)

export const blockUser = createAsyncThunk(
   'adminData/blockUser',
   async (id) => {
      const response = await axios.post(`${localhostURL}/admin/blockUser`, { userID: id });
      if (response.data.modifiedCount === 1) {
         return id;
      }
   }
)

export const unblockUser = createAsyncThunk(
   'adminData/unblockUser',
   async (id) => {
      const response = await axios.post(`${localhostURL}/admin/unblockUser`, { userID: id });
      if (response.data.modifiedCount === 1) {
         return id;
      }
   }
)

export const editUser = createAsyncThunk(
   'adminData/editUser',
   async ({ id, newName }) => {
      const response = await axios.post(`${localhostURL}/admin/editUser`, { id, newName });
      if(response.data.modifiedCount === 1){
         return {id, newName};
      }
   }
);