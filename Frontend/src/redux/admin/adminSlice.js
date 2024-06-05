import { createSlice } from "@reduxjs/toolkit";
import { fetchUser, deleteUser } from "./adminThunks";

const initialState = [];

const adminSlice = createSlice({
  name: "adminSlice",
  initialState: {
    usersList: initialState,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        const userList = action.payload;
        state.usersList = userList;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserID = action.payload;
        const afterDelete = state.usersList.filter((user) => user._id != deletedUserID && user);
        state.usersList = afterDelete;
      })
  }
});

export default adminSlice.reducer;