import { g as goto } from "../../../chunks/client.js";
import { a as axiosInstance } from "../../../chunks/session.js";
const ssr = false;
const load = async ({ url }) => {
  try {
    const response = await axiosInstance.get("/vault");
    if (response.data && Array.isArray(response.data)) {
      const responseArray = response.data.map((item) => {
        return {
          websiteURL: item.websiteURL,
          email: item.email,
          password: item.password,
          iv: item.iv,
          passwordID: item.passwordID
        };
      });
      return {
        passwords: responseArray
      };
    }
  } catch (error) {
    goto();
  }
};
export {
  load,
  ssr
};
