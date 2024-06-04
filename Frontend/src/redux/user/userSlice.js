import { createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../user/userThunk"

const intialData = JSON.parse(localStorage.getItem("myData"));

const userSlice = createSlice({
  name: "myData",
  initialState: intialData,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPost.fulfilled, (state, action) => {
        state = action.payload;
        localStorage.setItem("myData", JSON.stringify(state));
        return state;
      })
  }  
})

export default userSlice.reducer;