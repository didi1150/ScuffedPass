import { a as axiosInstance } from "../../../chunks/axios.js";
const load = async () => {
  const response = await axiosInstance.get("/vault");
  try {
    if (response.data && Array.isArray(response.data)) {
      const responseArray = response.data.map((item) => {
        return {
          website: item.websiteURL,
          email: item.email,
          password: item.password,
          iv: item.iv
        };
      });
      return {
        passwords: responseArray
      };
    }
  } catch (error) {
    console.error("Failed to fetch passwords:", error);
    return { responseArray: [] };
  }
};
export {
  load
};
