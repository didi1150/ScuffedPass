import { r as readToken } from "./session.js";
const isBrowser = typeof window !== "undefined" && typeof window.localStorage !== "undefined";
function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64).split("").map(function(c) {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join("")
  );
  return JSON.parse(jsonPayload);
}
const hasRole = (roleName) => {
  if (isBrowser) {
    let token = readToken();
    const decodedToken = isBrowser ? parseJwt(token) : "";
    return decodedToken.roles.some((role) => role.name === roleName);
  } else return false;
};
export {
  hasRole as h
};
