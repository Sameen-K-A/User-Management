import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localhostURL } from "../../services/url"

export const fetchUser = createAsyncThunk(
    "adminSlice/fetchUser",
    async () => {
        const response = await axios.get(`${localhostURL}/admin/fetchuser`);
        return response.data;
    }
);

export const deleteUser = createAsyncThunk(
    "adminSlice/deleteUser",
    async (id) => {
        const response = await axios.post(`${localhostURL}/admin/deleteUser`, { userID: id });
        if (response.data.deletedCount == 1) {
            return id;
        } else {
            throw new Error("Something wrong until delete")
        }
    }
)