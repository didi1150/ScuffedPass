// @ts-nocheck
import { goto } from "$app/navigation";
import { axiosInstance } from "$lib/interceptors/axios";

export const ssr = false;

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export const load = async ({ params, url }: Parameters<import("./$types").PageLoad>[0]) => {
  try {
    const token = url.searchParams.get("token");
    if (!token) {
      return {
        success: false,
      };
    }

    const email = url.searchParams.get("email");
    if (!email) {
      return {
        success: false,
      };
    }

    const result = await axiosInstance.get(
      `/auth/account/confirmlock?token=${token}&email=${email}`
    );
    if (result.status === 200) {
      return {
        success: true,
      };
    } else {
      return { success: false };
    }
  } catch (error) {
    return {
      success: true,
    };
  }
};
