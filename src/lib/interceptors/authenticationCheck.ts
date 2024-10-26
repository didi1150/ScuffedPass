import { goto } from "$app/navigation";
import { axiosInstance } from "./axios";

export const checkToken = async (url: string) => {
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
    await goto("/login");
  }
};
