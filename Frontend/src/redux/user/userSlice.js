import { createSlice } from "@reduxjs/toolkit";
import { loginVerification, editProfile } from "../user/userThunk";

const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null;
const darkMode = localStorage.getItem("darkMode") ? true : false;

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: userData,
    editConfirm: false,
    darkMode: darkMode
  },
  reducers: {
    logoutUser: (state) => {
      state.userData = null;
      state.darkMode = false;
      localStorage.removeItem("darkMode");
      localStorage.removeItem('userData');
    },
    resetEdit: (state) => {
      state.editConfirm = false;
    },
    changetoLightMode: (state) => {
      state.darkMode = false;
      localStorage.removeItem("darkMode")
    },
    changetoDarkMode: (state) => {
      state.darkMode = true;
      localStorage.setItem("darkMode", true)
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
export const { logoutUser, resetEdit, changetoDarkMode, changetoLightMode } = userSlice.actions;