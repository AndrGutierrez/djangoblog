import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, action) => action.payload.user,
    logout: () => null,
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
