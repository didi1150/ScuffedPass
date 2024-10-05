import { goto } from "$app/navigation";
import { axiosInstance } from "$lib/interceptors/axios";
export const ssr = false;
/** @type {import('./$types').PageLoad} */
export const load: import('./$types').PageLoad = async ({ params, url }) => {
    try {
        const token = url.searchParams.get("token");
        if (!token) { await goto("/login") };

        const result = await axiosInstance.get(
            `/auth/account/confirm?token=${token}`,
        );
        if (result.status === 200) {
            return {
                success: true
            }
        } else {
            goto("/login");
        }

    } catch (error) { }
};