import { configureStore } from "@reduxjs/toolkit";
import adminCredSlice from "./slice/adminCredSlice";
import { categorySlice } from "./slice/categorySlice";
import { subCategorySlice } from "./slice/subCategorySlice";
import { productSlice } from "./slice/productSlice";
import { wishListSlice } from "./slice/wishlistSlice";

export const store = configureStore({
  reducer: {
    adminCredSlice,
    category: categorySlice,
    subCategory: subCategorySlice,
    product: productSlice,
    wishlist: wishListSlice,
  },
});
