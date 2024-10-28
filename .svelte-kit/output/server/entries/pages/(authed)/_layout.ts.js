import { g as goto } from "../../../chunks/client.js";
import { a as axiosInstance } from "../../../chunks/session.js";
import { r as redirect } from "../../../chunks/index.js";
const checkToken = async (url) => {
  try {
    const response = await axiosInstance.get("/auth/account/user");
    if (url === "/login" || url === "/register") {
      await goto("/");
    }
    if (response.status !== 200) {
      await goto("/login");
    }
    return "succeed";
  } catch (error) {
    console.error("Failed to verify user token:", error);
    await goto();
  }
};
const ssr = false;
let checking = false;
const load = async ({ url }) => {
  if (!checking) {
    checking = true;
    const result = await checkToken(url.pathname);
    if (!result) {
      throw redirect(303, "/login");
    }
    checking = false;
  }
};
export {
  load,
  ssr
};
