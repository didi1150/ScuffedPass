import { a as axiosInstance } from "../../../../chunks/session.js";
const ssr = false;
const load = async ({ params, url }) => {
  try {
    const token = url.searchParams.get("token");
    if (!token) {
      return {
        success: false
      };
    }
    const result = await axiosInstance.get(
      `/auth/account/confirm?token=${token}`
    );
    if (result.status === 200) {
      return {
        success: true
      };
    } else {
      return {
        success: false
      };
    }
  } catch (error) {
    return {
      success: false
    };
  }
};
export {
  load,
  ssr
};
