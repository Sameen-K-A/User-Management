import axios from "axios";
import { localhostURL } from "../url";

const admin_api = axios.create({
   baseURL: `${localhostURL}/admin`
});

admin_api.interceptors.request.use(
   (config) => {
      const token = JSON.parse(localStorage.getItem("admin-token"));
      if (token) {
         config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error)
   }
)

export default admin_api;