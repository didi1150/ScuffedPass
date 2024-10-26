import { goto } from "$app/navigation";
import { axiosInstance } from "$lib/interceptors/axios.js";
export const ssr = false;
export const load = async ({ url }) => {
  //   if (url.pathname !== "/") return;
  // console.log("Loading Passwords...");
  try {
    const response = await axiosInstance.get<Password>("/vault");
    // console.log(response.data);
    if (response.data && Array.isArray(response.data)) {
      const responseArray: Password[] = response.data.map((item: Password) => {
        return {
          websiteURL: item.websiteURL,
          email: item.email,
          password: item.password,
          iv: item.iv,
          passwordID: item.passwordID,
        };
      });

      return {
        passwords: responseArray,
      };
    }
  } catch (error) {
    // console.error("Failed to fetch passwords:", error);
    goto("/login"); // Return an empty array in case of error
  }
};
