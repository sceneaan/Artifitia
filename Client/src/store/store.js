import { configureStore } from "@reduxjs/toolkit";
import adminCredSlice from "./slice/adminCredSlice";
import { categorySlice } from "./slice/categorySlice";
import { subCategorySlice } from "./slice/subCategorySlice";
export const store = configureStore({
  reducer: {
    adminCredSlice,
    category: categorySlice,
    subCategory: subCategorySlice,
  },
});
