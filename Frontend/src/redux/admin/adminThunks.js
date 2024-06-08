import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { localhostURL } from "../../services/url";
import admin_api from "../../services/adminAPI/axiosInstance";

export const fetchUser = createAsyncThunk(
  "adminSlice/fetchUser",
  async () => {
    const response = await admin_api.get(`/fetchuser`);
    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  "adminSlice/deleteUser",
  async ({id, toast}, {rejectWithValue}) => {
    const response = await admin_api.post(`/deleteUser`, { userID: id });
    if (response.data.deletedCount == 1) {
      return id;
    } else if (response.data == "Access_denied" || response.data == "authentication_failed") {
      toast.error("Access denied please login again", { hideProgressBar: true, autoClose: 3000 });
      rejectWithValue("Access_denied")
    } else {
      throw new Error("User name can't change please try again later");
    }
  }
)

export const editName = createAsyncThunk(
  "adminSlice/editName",
  async ({ id, name, toast }, { rejectWithValue }) => {
    const response = await admin_api.post(`/editUser`, { userID: id, newName: name });
    if (response.data.modifiedCount == 1) {
      return { id, name }
    } else if (response.data == "Access_denied" || response.data == "authentication_failed") {
      toast.error("Access denied please login again", { hideProgressBar: true, autoClose: 3000 });
      rejectWithValue("Access_denied")
    } else {
      throw new Error("User name can't change please try again later");
    }
  }
)

export const login = createAsyncThunk(
  "adminSlice/login",
  async ({ email, password, toast }, { rejectWithValue }) => {
    if (email.trim() == "" || password.trim() == "") {
      toast.error("All the fields are required!", { hideProgressBar: true, autoClose: 3000 });
      return rejectWithValue("all fields are required")
    } else {
      const response = await axios.post(`${localhostURL}/admin/login`, { email, password });
      if (response.data == "EmailNotFound") {
        toast.error("Email not found", { hideProgressBar: true, autoClose: 3000 });
        return rejectWithValue("EmailNotFound");
      } else if (response.data == "passwordwrong") {
        toast.error("Entered password is wrong", { hideProgressBar: true, autoClose: 3000 });
        return rejectWithValue("passwordwrong");
      } else {
        return response.data;
      }
    }
  }
)