import axios1 from "axios";
import { store } from "../store/store";
import { setProducts } from "../store/slice/productSlice";

const token = localStorage.getItem("token");
const axios = axios1.create({
  baseURL: "http://localhost:3001",
});
const HEADER = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
};

//add product
export const addProductApi = async (body) => {
  try {
    const response = await axios.post("/product/addproduct", body, {
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

//list products
export const listProductApi = async (body) => {
  try {
    const response = await axios.post("/product/listproducts", body);
    if (response.status === 200) {
      store.dispatch(setProducts(response.data));
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
