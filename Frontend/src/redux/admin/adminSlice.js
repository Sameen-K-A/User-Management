import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, deleteUser } from "./adminThunks";

const initialState = [];

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    orginalData: initialState,
    usersList: initialState,
  },
  reducers: {
    searchUser: (state, action) => {
      const searchName = action.payload.toLowerCase();
      state.usersList = state.orginalData.filter((user) => user.name.toLowerCase().includes(searchName));
    }
  },
  extraReducers: (builder) => {
    builder
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
  }
});

const { searchUser } = adminSlice.actions;
export { searchUser }
export default adminSlice.reducer;