import { hash } from "bcryptjs";
import { genSalt } from "$lib/gensalt";

const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export const hashMasterPassword = async (
  email: string,
  masterPassword: string
) => {
  const salt = await genSalt(email, masterPassword);
  const hashPW = await hash(masterPassword, salt);
  return {
    hashPW,
    salt,
  };
};

const getNewKey = async (password: string, salt: string) => {
  if (isBrowser) {
    const enc = new TextEncoder();
    const baseKey = await crypto.subtle.importKey(
      "raw",
      enc.encode(password),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"]
    );
    const params = {
      name: "PBKDF2",
      salt: await bcryptToArrayBuffer(salt),
      iterations: 100000,
      hash: "SHA-256",
    };
    return await crypto.subtle.deriveKey(
      params,
      baseKey,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }
};

export const encryptData = async (
  password: string,
  salt: string,
  data: string
) => {
  const key = await getNewKey(password, salt);
  // console.log("Salt: ", salt);
  if (!key) return "ERROR";
  // console.log("Generated key: ", key);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ivString = uint8ArrayToBase64(iv);
  const encryptedData = arrayBufferToBase64(
    await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      key,
      new TextEncoder().encode(data)
    )
  );
  // console.log("ciphertext: ", encryptedData);
  // console.log("IvString: ", ivString);
  return {
    iv: ivString,
    encryptedData,
  };
};

export const decryptData = async (
  password: string,
  salt: string,
  data: string,
  iv: string
) => {
  // console.log("IV: ", iv, " Salt: ", salt);
  const key = await getNewKey(password, salt);
  if (!key) return "ERROR";
  // console.log("Generated key: ", key);
  // console.log("Ciphertext: ", data);
  const dataBuffer = base64ToArrayBuffer(data);
  const ivArray = base64ToUint8Array(iv);
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: ivArray,
    },
    key,
    dataBuffer
  );
  return new TextDecoder().decode(decryptedData);
};

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const length = bytes.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const base64ToArrayBuffer = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

function uint8ArrayToBase64(uint8Array: Uint8Array) {
  let binaryString = "";
  const len = uint8Array.length;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
}

function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const uint8Array = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return uint8Array;
}

const bcryptToArrayBuffer = async (bcryptHash: string) => {
  // Remove the bcrypt version and salt (first 29 characters)
  const hashOnly = bcryptHash.slice(29);

  // Decode the base64 string to get the raw bytes
  const binaryString = atob(hashOnly);

  // Create an ArrayBuffer from the binary string
  const buffer = new ArrayBuffer(binaryString.length);
  const view = new Uint8Array(buffer);

  for (let i = 0; i < binaryString.length; i++) {
    view[i] = binaryString.charCodeAt(i);
  }

  return buffer;
};
