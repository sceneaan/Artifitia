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
    const response = await axios.post(
      "/product/addproduct",
      body,

      {
        headers: {
          ...HEADER,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      console.log(response.data);
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

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

export const getSingleProductApi = async (productId) => {
  try {
    const response = await axios.get(`/product/getproduct/${productId}`);
    if (response.status === 200) {
      console.log(response.data);
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const editProductApi = async (productId) => {
  try {
    const response = await axios.post("/product/editproduct", productId, {
      headers: {
        ...HEADER,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      console.log(response.data);
    }
    return response;
  } catch (error) {
    console.log(error.message);
  }
};
