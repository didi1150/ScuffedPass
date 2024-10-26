import { checkToken } from "$lib/interceptors/authenticationCheck";
import { redirect } from "@sveltejs/kit";

export const ssr = false;

let checking = false;

export const load = async ({ url }) => {
  if (!checking) {
    checking = true;
    const result = await checkToken(url.pathname);
    if (!result) {
      throw redirect(303, "/login");
    }
    checking = false;
  }
};
