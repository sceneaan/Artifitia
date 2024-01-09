import axios1 from "axios";
import { store } from "../store/store";
import { setSubCategories } from "../store/slice/subCategorySlice";

const token = localStorage.getItem("token");
const axios = axios1.create({
  baseURL: "http://localhost:3001",
});
const HEADER = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
};

export const addSubCategoryApi = async (body) => {
  try {
    const response = await axios.post(
      "/subcategory/addsubcategory",
      body,
      { headers: HEADER }
    );
    if (response.status === 200) {
      console.log(response.data);
    }
    return response
  } catch (error) {
    console.log(error.message);
  }
};

export const listSubCategoryApi = async (body) => {
  try {
    const response = await axios.post("/subcategory/listsubcategories", body);
    if (response.status === 200) {
      store.dispatch(setSubCategories(response.data));
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
