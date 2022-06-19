import axios from "axios";
import { baseURL } from "../settings";
import router from "@/router";
import store from "@/store/index";

const instance = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.response.use(
  (responce) => responce,
  (error) => {
    if (error.response.status == 401) {
      store.dispatch("user/setUser", null);
      router.push({ name: "login" });
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
