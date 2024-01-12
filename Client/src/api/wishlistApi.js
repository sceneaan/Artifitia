import axios1 from "axios";
import { store } from "../store/store";
import { setWishLists } from "../store/slice/wishlistSlice";

const token = localStorage.getItem("token");
const adminId = localStorage.getItem("adminId");
const axios = axios1.create({
  baseURL: "http://localhost:3001",
});
const HEADER = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
};

export const addWishlistApi = async (productId) => {
  try {
    const response = await axios.post(
      "/wishlist/addwishlist",
      { productId, adminId },
      {
        headers: HEADER,
      }
    );

    if (response.status === 200) {
      console.log(response.data);
      store.dispatch(setWishLists(response.data));
    }

    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeWishlistApi = async (productId) => {
  try {
    const response = await axios.post(
      "/wishlist/removewishlist",
      { productId, adminId },
      {
        headers: HEADER,
      }
    );

    if (response.status === 200) {
      store.dispatch(setWishLists(response.data));
    }

    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const listWishListApi = async (productId) => {
  try {
    const response = await axios.post(
      "/wishlist/listwishlists",
      {
        productId,
        adminId,
      },
      {
        headers: HEADER,
      }
    );
    if (response.status === 200) {
      store.dispatch(setWishLists(response.data));
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
