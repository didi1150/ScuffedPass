import { axiosInstance } from "$lib/interceptors/axios";

export const load = async () => {
  const result = await axiosInstance.get("/admin/users");
  if (result && result.status === 200) {
    return {
      users: result.data,
    };
  }
};
