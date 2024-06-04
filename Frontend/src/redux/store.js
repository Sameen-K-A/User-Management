import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../redux/admin/adminSlice";
import userReducer from "../redux/user/userSlice";

const store = configureStore({
  reducer: {
    adminData: adminReducer,
    myData: userReducer
  }
})

export default store;