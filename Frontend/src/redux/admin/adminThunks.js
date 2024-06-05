import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localhostURL } from "../../services/url"

export const fetchUser = createAsyncThunk(
    "adminSlice/fetchUser",
    async () => {
        const response = await axios.get(`${localhostURL}/admin/fetchuser`);
        return response.data;
    }
)