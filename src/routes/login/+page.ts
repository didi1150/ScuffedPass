import { goto } from "$app/navigation";
import { axiosInstance } from "$lib/interceptors/axios";

export const ssr = false;
export const load = async () => {
  try {
    await axiosInstance.get("/auth/account/user");

    goto("/");
  } catch (error) {}
};