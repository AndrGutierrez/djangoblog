import { createSlice } from '@reduxjs/toolkit'

const loadingSlice = {
  name: "progress",
  initialState: 0,
  reducers: {
    setProgress: ()=> action.payload
  }
}

export const {setProgress} = loadingSlice.actions
export default loadingSlice.reducer
