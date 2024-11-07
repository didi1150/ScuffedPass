import { goto } from "$app/navigation";
import { axiosInstance } from "$lib/interceptors/axios.js";
export const ssr = false;
export const load = async () => {
  try {
    const response = await axiosInstance.get<Password>("/vault");
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
        responseArray,
      };
    }
  } catch (error) {
    // console.error("Failed to fetch passwords:", error);
    goto("/login"); // Return an empty array in case of error
  }
};
