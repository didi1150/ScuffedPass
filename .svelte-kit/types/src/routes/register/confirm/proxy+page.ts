// @ts-nocheck
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

    const result = await axiosInstance.get(
      `/auth/account/confirm?token=${token}`
    );
    if (result.status === 200) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (error) {
    return {
      success: false,
    };
  }
};
