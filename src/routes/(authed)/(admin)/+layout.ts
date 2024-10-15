import { hasRole } from "$lib/roles";
import { redirect } from "@sveltejs/kit";

export const load = async () => {
  if (!hasRole("admin")) throw redirect(303, "/");
};
