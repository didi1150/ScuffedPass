import { goto } from "$app/navigation";
import { axiosInstance } from "$lib/interceptors/axios";
export const ssr = false;
let error = false;
export const load = async () => {
  if (error) return;
  try {
    if (await axiosInstance.get("/auth/account/user")) {
      goto("/");
      error = false;
    }
  } catch (error) {
    error = true;
  }
};
