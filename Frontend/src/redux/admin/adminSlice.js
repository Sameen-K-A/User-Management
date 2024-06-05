import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./adminThunks";

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
  }
});

export default adminSlice.reducer;