import { a as axiosInstance } from "../../../../../chunks/session.js";
const load = async () => {
  const result = await axiosInstance.get("/admin/users");
  if (result && result.status === 200) {
    return {
      users: result.data
    };
  }
};
export {
  load
};
