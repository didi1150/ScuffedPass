import { h as hasRole } from "../../../../chunks/roles.js";
import { r as redirect } from "../../../../chunks/index.js";
const load = async () => {
  if (!hasRole("admin")) throw redirect(303, "/");
};
export {
  load
};
