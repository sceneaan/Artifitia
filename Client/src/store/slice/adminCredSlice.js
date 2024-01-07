import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCred: undefined,
};

export const adminCredSlice = createSlice({
  name: "adminCredSlice",
  initialState,
  reducers: {
    setUserCred: (state, action) => {
      state.userCred = action.payload;
    },
  },
});

export const { setUserCred } = adminCredSlice.actions;

export default adminCredSlice.reducer;
