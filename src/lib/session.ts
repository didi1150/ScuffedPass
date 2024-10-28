import { get, writable } from "svelte/store";
import { axiosInstance } from "./interceptors/axios";

const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const token = writable(isBrowser ? localStorage.getItem("token") || "" : "");
const refreshToken = writable(
  isBrowser ? localStorage.getItem("refresh-token") || "" : ""
);

if (isBrowser) {
  token.subscribe((value) => localStorage.setItem("token", value));
  refreshToken.subscribe((value) =>
    localStorage.setItem("refresh-token", value)
  );
}

export const symmetricKey = writable("");

export const salt = writable("");
export const readToken = () => {
  return get(token);
};

export const setSymmetricKey = (key: string) => {
  symmetricKey.set(key);
};

export const getSymmetricKey = () => {
  const key = get(symmetricKey);
  if (key.length !== 0) return key;
  return "";
};

export const setToken = (newToken: string) => {
  token.set(newToken);
};

export const getRefreshToken = () => {
  return get(refreshToken);
};

export const setRefreshToken = (t: string) => {
  return refreshToken.set(t);
};

export const getSalt = async (email: string) => {
  if (get(salt).length === 0) {
    const salt_res = await axiosInstance.get(
      `/auth/account/get-salt?email=${email}`
    );
    salt.set(salt_res.data);
    return salt_res.data;
  } else return get(salt);
};

export const setSalt = (newSalt: string) => {
  salt.set(newSalt);
};
