import { createSlice } from "@reduxjs/toolkit";
import { login, fetchUser, deleteUser, editName } from "./adminThunks";

const initialState = [];
const token = localStorage.getItem("admin-token") ? JSON.parse(localStorage.getItem("admin-token")) : false;

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    orginalData: initialState,
    usersList: initialState,
    jwtToken: token
  },
  reducers: {
    searchUser: (state, action) => {
      const searchName = action.payload.toLowerCase();
      state.usersList = state.orginalData.filter((user) => user.name.toLowerCase().includes(searchName));
    },
    logoutAdmin: (state) => {
      state.orginalData = [];
      state.usersList = [];
      state.jwtToken = false;
      localStorage.removeItem('admin-token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const newToken = action.payload;
        state.jwtToken = newToken;
        localStorage.setItem("admin-token", JSON.stringify(newToken));
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const userList = action.payload;
        state.usersList = userList;
        state.orginalData = userList;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserID = action.payload;
        state.usersList = state.usersList.filter((user) => user._id != deletedUserID && user);;
        state.orginalData = state.orginalData.filter((user) => user._id != deletedUserID && user);;
      })
      .addCase(editName.fulfilled, (state, action) => {
        const userID = action.payload.id;
        const newName = action.payload.name;
        state.usersList = state.usersList.map((user) => user._id == userID ? { ...user, name: newName } : user);
        state.orginalData = state.orginalData.map((user) => user._id == userID ? { ...user, name: newName } : user);
      })
  }
});

const { searchUser, logoutAdmin } = adminSlice.actions;
export { searchUser, logoutAdmin }
export default adminSlice.reducer;