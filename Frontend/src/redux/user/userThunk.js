import axios from "axios";
import { localhostURL } from "../../services/url";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const registerUser = async ({ name, email, phone, password, confirmPassword, toast }) => {
  name = name.trim();
  email = email.trim();
  phone = phone.trim();
  password = password.trim();
  confirmPassword = confirmPassword.trim();
  const nameRegex = /^[a-zA-Z\s]{3,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  if (name === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
    toast.warning("All the fields are required!", { hideProgressBar: true, autoClose: 3000 });
  } else if (!nameRegex.test(name)) {
    toast.warning("Name must be between 3 to 20 characters and contain only letters!", { hideProgressBar: true, autoClose: 3000 });
  } else if (!emailRegex.test(email)) {
    toast.warning("Invalid email address!", { hideProgressBar: true, autoClose: 3000 });
  } else if (!phoneRegex.test(phone)) {
    toast.warning("Invalid phone number!", { hideProgressBar: true, autoClose: 3000 });
  } else if (password.length < 8) {
    toast.warning("Password must be at least 8 characters long!", { hideProgressBar: true, autoClose: 3000 });
  } else if (password !== confirmPassword) {
    toast.warning("Password and confirm password do not match!", { hideProgressBar: true, autoClose: 3000 });
  } else {
    const response = await axios.post(`${localhostURL}/registerPost`, { name, email, phone, password })
    if (response.data === "UserExist") {
      toast.error("Email already exist", { hideProgressBar: true, autoClose: 3000 });
    } else {
      toast.success("Registration completed successfully", { hideProgressBar: true, autoClose: 2500 });
      return "success";
    }
  }
}

export const editProfile = createAsyncThunk(
  "userSlice/editProfile",
  async ({ formData, name, phone, image, toast }, { rejectWithValue }) => {
    try {
      name = name.trim();
      phone = phone.toString().trim();
      const nameRegex = /^[a-zA-Z\s]{3,20}$/;
      const phoneRegex = /^[6-9]\d{9}$/;
      if (name === "" || phone === "") {
        toast.warning("All the fields are required!", { hideProgressBar: true, autoClose: 3000 });
        return rejectWithValue("All the fields are required!");
      } else if (!nameRegex.test(name)) {
        toast.warning("Name must be between 3 to 20 characters and contain only letters!", { hideProgressBar: true, autoClose: 3000 });
        return rejectWithValue("Invalid name format!");
      } else if (!phoneRegex.test(phone)) {
        toast.warning("Invalid phone number!", { hideProgressBar: true, autoClose: 3000 });
        return rejectWithValue("Invalid phone number format!");
      } else {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.post(`${localhostURL}/editProfile`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.data.acknowledged === true && response.data.modifiedCount == 1) {
          toast.success("Update changes successfully", { hideProgressBar: true, autoClose: 3000 });
          return { name, phone, ...(image && { profileURL: image.name }) };
        } else if (response.data === "Access_denied") {
          toast.warning("Access_denied", { hideProgressBar: true, autoClose: 3000 });
          return rejectWithValue("Access_denied");
        } else if (response.data === "authentication_failed") {
          toast.warning("Authentication failed please login again", { hideProgressBar: true, autoClose: 3000 });
          return rejectWithValue("Access_denied");
        } else {
          toast.warning("No changes detected", { hideProgressBar: true, autoClose: 3000 });
          return rejectWithValue("No changes found");
        }
      }
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Something went wrong, please try again later", { hideProgressBar: true, autoClose: 3000 });
      return rejectWithValue(error.message);
    }
  }
)