import { createSlice } from "@reduxjs/toolkit";
import { loginVerification } from "../user/userThunk";

const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: userData
  },
  reducers: {
    logoutUser: (state) => {
      state.userData = null;
      localStorage.removeItem('userData');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginVerification.fulfilled, (state, action) => {
        const data = action.payload;
        state.userData = data;
        localStorage.setItem("userData", JSON.stringify(data));
      })
  }
})

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;