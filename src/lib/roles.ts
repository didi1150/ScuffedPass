import { writable } from "svelte/store";
import { readToken } from "./session";
import { browser } from "$app/environment";

const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

function parseJwt(token: string): any {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

let token = isBrowser ? readToken() : "";
const decodedToken: JwtPayload = isBrowser ? parseJwt(token) : "";

interface Role {
  id: number;
  name: string;
}

interface JwtPayload {
  roles: Role[];
  [key: string]: any; // to allow other properties in the payload
}

export const hasRole = (roleName: string): boolean => {
  if (isBrowser)
    return decodedToken.roles.some((role) => role.name === roleName);
  else return false;
};
