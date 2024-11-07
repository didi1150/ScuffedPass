import "../../../chunks/client.js";
import { a as axiosInstance } from "../../../chunks/session.js";
const ssr = false;
const load = async ({ params, url }) => {
  try {
    const token = url.searchParams.get("token");
    if (!token) {
      return {
        success: false
      };
    }
    const email = url.searchParams.get("email");
    if (!email) {
      return {
        success: false
      };
    }
    const result = await axiosInstance.get(
      `/auth/account/confirmlock?token=${token}&email=${email}`
    );
    if (result.status === 200) {
      return {
        success: true
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    return {
      success: true
    };
  }
};
export {
  load,
  ssr
};
