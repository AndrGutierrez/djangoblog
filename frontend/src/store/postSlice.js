import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: null,
  reducers: {
    setData: (state, action) => action.payload.values,
  },
});

export const { setData } = postSlice.actions;
export default postSlice.reducer;
