import { goto } from "$app/navigation";
import { checkToken } from "$lib/interceptors/authenticationCheck";
import { redirect } from "@sveltejs/kit";

export const ssr = false;

let checking = false;

export const load = async () => {
  if (!checking) {
    checking = true;
    const result = await checkToken("/");
    if (!result || result.status !== 200) throw redirect(303, "/login");
    checking = false;
  }
};
