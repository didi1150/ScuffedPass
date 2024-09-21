import { invalidateAll } from "$app/navigation";
import {
  getRefreshToken,
  readToken,
  setRefreshToken,
  setSalt,
  setToken,
} from "$lib/session";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.API_URL,
});

import * as jose from "jose";

axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${readToken()}`;

// const createAxiosResponseInterceptor = () => {
//   const interceptor = axiosInstance.interceptors.response.use(
//     (resp) => resp,
//     (error) => {
//       axiosInstance.interceptors.response.eject(interceptor);
//       if (error.response.status === 403) {
//         axiosInstance.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${getRefreshToken()}`;
//         axiosInstance
//           .post("auth/account/refresh-token")
//           .then((response) => {
//             if (response.status === 200) {
//               axiosInstance.defaults.headers.common[
//                 "Authorization"
//               ] = `Bearer ${response.data.access_token}`;

//               // axiosInstance.post("auth/account/token-auth");
//               setToken(response.data.access_token);
//               setSalt(response.data.salt);
//               setRefreshToken(response.data.refresh_token);
//               return axiosInstance(response.data.config);
//             }
//           })
//           .catch((error2) => {
//             setToken("");
//             setRefreshToken("");
//             redirect(300, "/login");
//             return Promise.reject(error2);
//           })
//           .finally(createAxiosResponseInterceptor);
//       }
//     }
//   );
// };
// createAxiosResponseInterceptor();

const createAxiosRequestInterceptor = () => {
  axiosInstance.interceptors.request.use(async (req) => {
    if (req.url?.includes("refresh-token")) return req;
    let token = readToken();
    if (!token) return req;
    const { exp } = jose.decodeJwt(token);

    if (exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp < currentTime) {
        console.log("Token has expired");

        const response = await axiosInstance.post(
          "auth/account/refresh-token",
          {},
          { headers: { Authorization: `Bearer ${getRefreshToken()}` } }
        );
        if (response.status !== 200) {
          setToken("");
          setSalt("");
          setRefreshToken("");
          return req;
        }
        console.log(response);
        setToken(response.data.access_token);
        setSalt(response.data.salt);
        setRefreshToken(response.data.refresh_token);
        invalidateAll();
      }
    }
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  });
};

createAxiosRequestInterceptor();
