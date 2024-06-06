import { createSlice } from "@reduxjs/toolkit";
import { loginVerification, editProfile } from "../user/userThunk";

const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: userData,
    editConfirm: false
  },
  reducers: {
    logoutUser: (state) => {
      state.userData = null;
      localStorage.removeItem('userData');
    },
    resetEdit: (state) => {
      state.editConfirm = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginVerification.fulfilled, (state, action) => {
        const data = action.payload;
        state.userData = data;
        localStorage.setItem("userData", JSON.stringify(data));
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        const { name, phone, profileURL } = action.payload;
        state.userData.name = name;
        state.userData.phone = phone;
        if (profileURL) {
          state.userData.profileURL = profileURL;
        }
        state.editConfirm = true;
        localStorage.setItem("userData", JSON.stringify(state.userData));
      })
  }
})

export default userSlice.reducer;
export const { logoutUser, resetEdit } = userSlice.actions;