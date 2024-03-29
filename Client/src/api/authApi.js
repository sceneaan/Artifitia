import axios1 from "axios";
import { store } from "../store/store";
import { setUserCred } from "../store/slice/adminCredSlice";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");
const axios = axios1.create({
  baseURL: "http://localhost:3001",
});
const HEADER = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + token,
};

export const signUpApi = async (body) => {
  try {
    const response = await axios.post("/admin/signup", body);
    if (response.status === 200) {
      console.log(response.data);
    }
    
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

export const signInApi = async (body) => {
  try {
    const response = await axios.post("/admin/login", body);

    if (response.status === 200) {
      console.log(response.data);

      store.dispatch(setUserCred(response.data));
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("adminId", response.data.adminId);

    } else {
      console.error(response.data.message);

      toast.error("Sign in failed", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

    return response;
  } catch (error) {
    console.error(error.message);
  }
};
