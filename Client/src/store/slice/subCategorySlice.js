import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subCategories: [],
};

export const subCategorySlice = createSlice({
  name: "subCategory",
  initialState,
  reducers: {
    setSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },
  },
});

export const { setSubCategories } = subCategorySlice.actions;

export default subCategorySlice.reducer;
