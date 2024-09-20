import { w as writable } from "./index.js";
import { g as get_store_value } from "./utils.js";
import axios from "axios";
const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";
const token = writable(
  isBrowser ? localStorage.getItem("token") || "" : ""
);
const refreshToken$1 = writable(
  isBrowser ? localStorage.getItem("refresh-token") || "" : ""
);
const salt = writable("");
if (isBrowser) {
  token.subscribe((value) => localStorage.setItem("token", value));
  refreshToken$1.subscribe(
    (value) => localStorage.setItem("refresh-token", value)
  );
}
const readToken = () => {
  return get_store_value(token);
};
let refresh = false;
const axiosInstance = axios.create({
  baseURL: "/api/"
});
const refreshToken = async (error) => {
  if (error.response.status === 401 && !refresh) {
    refresh = true;
    const response = await axiosInstance.post("auth/account/refresh-token");
    if (response.status === 200) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`;
      salt.set(response.data.salt);
      return axiosInstance(error.config);
    }
  }
  refresh = false;
};
axiosInstance.interceptors.request.use(
  (req) => {
    req.headers["Authorization"] = `Bearer ${readToken()}`;
    return req;
  },
  async (error) => {
    return error;
  }
);
axiosInstance.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    await refreshToken(error);
    return error;
  }
);
export {
  axiosInstance as a
};
