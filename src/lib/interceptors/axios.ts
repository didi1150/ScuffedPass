import { goto, invalidateAll } from "$app/navigation";
import {
  getRefreshToken,
  readToken,
  setRefreshToken,
  setSalt,
  setToken,
} from "$lib/session";
import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import * as jose from "jose";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${readToken()}`;

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const refreshTokenIfNeeded = async (): Promise<string | null> => {
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
    goto("/login");
  }
  return null;
};

const processQueue = (token: string | null) => {
  refreshSubscribers.forEach((callback) => callback(token as string));
  refreshSubscribers = [];
};

const createAxiosInterceptors = () => {
  axiosInstance.interceptors.request.use(async (config) => {
    if (config.url?.includes("refresh-token")) return config;
    let token = readToken();
    if (!token || token.length < 10) return config;

    const { exp } = jose.decodeJwt(token);

    if (exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp < currentTime) {
        const newToken = await refreshTokenIfNeeded();
        if (newToken) {
          config.headers.Authorization = `Bearer ${newToken}`;
        }
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve) => {
            refreshSubscribers.push((token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
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
