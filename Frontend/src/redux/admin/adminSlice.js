import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, blockUser, unblockUser, editUser } from "./adminThunks";

const intialData = localStorage.getItem("usersArray") ? JSON.parse(localStorage.getItem("usersArray")) : [];

const adminSlice = createSlice({
  name: "adminData",
  initialState: {
    isLogin: false,
    usersArray: intialData,
    filteredUsers: intialData
  },
  reducers: {
    adminLogout: (state) => {
      localStorage.removeItem("usersArray");
      state.usersArray = [];
      state.filteredUsers = [];
    },
    searchUser: (state, action) => {
      const searchValue = action.payload.toLowerCase();
      state.filteredUsers = state.usersArray.filter((user) => user.name.toLowerCase().includes(searchValue));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        localStorage.setItem("usersArray", JSON.stringify(action.payload));
        state.usersArray = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        const userID = action.payload;
        state.usersArray = state.usersArray.map((user) => user._id == userID ? { ...user, isBlocked: true } : user);
        state.filteredUsers = state.filteredUsers.map((user) => user._id == userID ? { ...user, isBlocked: true } : user);
        localStorage.setItem("usersArray", JSON.stringify(state.usersArray));
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        const userID = action.payload;
        state.usersArray = state.usersArray.map((user) => user._id == userID ? { ...user, isBlocked: false } : user);
        state.filteredUsers = state.filteredUsers.map((user) => user._id == userID ? { ...user, isBlocked: false } : user);
        localStorage.setItem("usersArray", JSON.stringify(state.usersArray));
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const userID = action.payload.id;
        const newName = action.payload.newName;
        state.usersArray = state.usersArray.map((user) => user._id == userID ? { ...user, name: newName } : user);
        state.filteredUsers = state.filteredUsers.map((user) => user._id == userID ? { ...user, name: newName } : user);
        localStorage.setItem("usersArray", JSON.stringify(state.usersArray));
      })
  }
})

const { adminLogout, searchUser } = adminSlice.actions;
export { adminLogout, searchUser };
export default adminSlice.reducer;