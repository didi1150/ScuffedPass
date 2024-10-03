import { goto } from "$app/navigation";
import { axiosInstance } from "$lib/interceptors/axios.js";
import { setSalt } from "$lib/session";
export const ssr = false;
export const load = async () => {
  // console.log("Loading Passwords...");
  try {
    const response = await axiosInstance.get<Password>("/vault");
    // console.log(response.data);
    const saltResponse = await axiosInstance.get("/auth/account/user/salt");
    if (response.data && Array.isArray(response.data) && saltResponse.data) {
      const responseArray = response.data.map((item: Password) => {
        return {
          websiteURL: item.websiteURL,
          email: item.email,
          password: item.password,
          iv: item.iv,
          passwordID: item.passwordID,
        };
      });

      setSalt(saltResponse.data);
      return {
        passwords: responseArray,
      };
    }
  } catch (error) {
    console.error("Failed to fetch passwords:", error);
  }
};
