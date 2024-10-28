import { g as goto } from "../../../chunks/client.js";
import { a as axiosInstance } from "../../../chunks/session.js";
const ssr = false;
const load = async () => {
  try {
    if (await axiosInstance.get("/auth/account/user"))
      goto("/");
  } catch (error) {
  }
};
export {
  load,
  ssr
};
