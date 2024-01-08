import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishLists: [],
};

export const wishListSlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setWishLists: (state, action) => {
      state.wishLists = action.payload;
    },
  },
});

export const { setWishLists } = wishListSlice.actions;

export default wishListSlice.reducer;