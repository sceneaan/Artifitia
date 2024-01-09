import axios1 from "axios";
import { store } from "../store/store";
import { setCategories } from "../store/slice/categorySlice";

const token = localStorage.getItem("token");
const axios = axios1.create({
  baseURL: "http://localhost:3001",
});
const HEADER = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
};

export const addCategoryApi = async (body) => {
  try {
    const response = await axios.post("/category/addcategory", body, {
      headers: HEADER,
    });
    if (response.status === 200) {
      console.log(response.data);
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const listCategoryApi = async (body) => {
  try {
    const response = await axios.post("/category/listcategories", body);
    if (response.status === 200) {
      store.dispatch(setCategories(response.data));
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
