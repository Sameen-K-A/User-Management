import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { localhostURL } from "../../services/url";

export const loginPost = createAsyncThunk(
  "myData/loginPost",
  async ({ email, password }) => {
    const response = await axios.post(`${localhostURL}/loginPost`, { email, password });
    return response.data;
  }
)