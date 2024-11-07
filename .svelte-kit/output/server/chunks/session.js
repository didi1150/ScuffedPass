import { w as writable } from "./index2.js";
import { i as invalidateAll, g as goto } from "./client.js";
import { g as get_store_value } from "./utils.js";
import axios from "axios";
import * as jose from "jose";
const isBrowser$1 = typeof window !== "undefined" && typeof window.localStorage !== "undefined";
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/"
});
if (isBrowser$1)
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${readToken()}`;
let isRefreshing = false;
let refreshSubscribers = [];
const refreshTokenIfNeeded = async () => {
  try {
    const response = await axiosInstance.post(
      "auth/account/refresh-token",
      {},
      { headers: { Authorization: `Bearer ${getRefreshToken()}` } }
    );
    if (response.status === 200) {
      setToken(response.data.access_token);
      setSalt(response.data.salt);
      setRefreshToken(response.data.refresh_token);
      invalidateAll();
      return response.data.access_token;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    setToken("");
    setSalt("");
    setRefreshToken("");
    invalidateAll();
    goto();
  }
  return null;
};
const processQueue = (token2) => {
  refreshSubscribers.forEach((callback) => callback(token2));
  refreshSubscribers = [];
};
const createAxiosInterceptors = () => {
  axiosInstance.interceptors.request.use(async (config) => {
    if (config.url?.includes("refresh-token")) return config;
    let token2 = readToken();
    if (!token2 || token2.length < 10) return config;
    const { exp } = jose.decodeJwt(token2);
    if (exp) {
      const currentTime = Math.floor(Date.now() / 1e3);
      if (exp < currentTime) {
        const newToken = await refreshTokenIfNeeded();
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }
      } else {
        config.headers.Authorization = `Bearer ${token2}`;
      }
    }
    return config;
  });
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            refreshSubscribers.push((token2) => {
              originalRequest.headers.Authorization = `Bearer ${token2}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }
        originalRequest._retry = true;
        isRefreshing = true;
        try {
          const newToken = await refreshTokenIfNeeded();
          if (newToken) {
            processQueue(newToken);
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          processQueue(null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    }
  );
};
createAxiosInterceptors();
const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";
const token = writable(isBrowser ? localStorage.getItem("token") || "" : "");
const refreshToken = writable(
  isBrowser ? localStorage.getItem("refresh-token") || "" : ""
);
if (isBrowser) {
  token.subscribe((value) => localStorage.setItem("token", value));
  refreshToken.subscribe(
    (value) => localStorage.setItem("refresh-token", value)
  );
}
const salt = writable("");
const readToken = () => {
  return get_store_value(token);
};
const setToken = (newToken) => {
  token.set(newToken);
};
const getRefreshToken = () => {
  return get_store_value(refreshToken);
};
const setRefreshToken = (t) => {
  return refreshToken.set(t);
};
const setSalt = (newSalt) => {
  salt.set(newSalt);
};
export {
  axiosInstance as a,
  readToken as r
};
