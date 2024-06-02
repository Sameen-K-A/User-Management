import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../redux/admin/adminSlice";

const store = configureStore({
    reducer: {
        adminData: adminReducer,
    }
})

export default store;