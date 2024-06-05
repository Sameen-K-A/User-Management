import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./admin/adminSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
    reducer: {
        admin: adminSlice,
        user: userSlice
    }
})

export default store; 