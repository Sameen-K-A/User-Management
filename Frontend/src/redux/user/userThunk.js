import axios from "axios";
import { localhostURL } from "../../services/url";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const loginVerification = createAsyncThunk(
  "userSlice/loginVerification",
  async ({ email, password, toast }) => {
    password = password.trim();
    email = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || password === "") {
      toast.error("All fields are required", { hideProgressBar: true, autoClose: 3000 });
    } else if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address", { hideProgressBar: true, autoClose: 3000 });
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters", { hideProgressBar: true, autoClose: 3000 });
    } else {
      const response = await axios.post(`${localhostURL}/loginPost`, { email, password });
      if (response.data === "notFound") {
        toast.error("User not found", { hideProgressBar: true, autoClose: 3000 });
      } else if (response.data === "wrongPassword") {
        toast.error("Password is wrong", { hideProgressBar: true, autoClose: 3000 });
      } else {
        return response.data;
      }
    }
  }
)