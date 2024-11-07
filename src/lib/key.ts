import { hash } from "bcryptjs";
import { genSalt } from "$lib/gensalt";

const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const isStringEmpty = (input: string) => {
  return !input || input.trim() === "";
}

export const hashMasterPassword = async (
  email: string,
  masterPassword: string,
  salt: string | undefined = undefined
) => {
  if (!salt) salt = await genSalt(email, masterPassword);
  const hashPW = await hash(masterPassword, salt);
  return {
    hashPW,
    salt,
  };
};

/**
 * @param password Non hashed plaintext master password
 * @param salt Salt generated using user's master password and email
 *
 */
export const deriveMasterKeyFromPassword = async (
  password: string,
  salt: string
) => {
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
  return "";
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

export const uint8ArrayToBase64 = (uint8Array: Uint8Array) => {
  let binaryString = "";
  const len = uint8Array.length;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binaryString);
};

export const base64ToUint8Array = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const uint8Array = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return uint8Array;
};

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

//-----------------------------------------------------------------------------------------------

export const generateKeyPair = async () => {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048, // Can also be 3072 or 4096 for higher security
      publicExponent: new Uint8Array([1, 0, 1]), // Standard exponent for RSA keys
      hash: { name: "SHA-256" }, // Hashing algorithm used in RSA-OAEP
    },
    true, // Key is extractable
    ["encrypt", "decrypt"] // Usage for encrypting and decrypting
  );

  const publicKey = await crypto.subtle.exportKey("spki", keyPair.publicKey);
  const privateKey = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

  return {
    publicKey: arrayBufferToBase64(publicKey),
    privateKey: arrayBufferToBase64(privateKey),
  };
};

export const generateRecoveryKey = () => {
  const recoveryKey = crypto.getRandomValues(new Uint8Array(32)); // 256-bit recovery key
  return uint8ArrayToBase64(recoveryKey);
};

export const generateIV = () => {
  return crypto.getRandomValues(new Uint8Array(12));
};

export const deriveKeyFromRecoveryKey = async (
  recoveryKeyBase64: string,
  salt: string,
  iterations: number = 100000
): Promise<CryptoKey> => {
  // Decode the base64 recovery key to a Uint8Array
  const recoveryKeyBytes = base64ToUint8Array(recoveryKeyBase64);

  // Import the decoded recovery key as a raw key for PBKDF2
  const baseKey = await crypto.subtle.importKey(
    "raw",
    recoveryKeyBytes, // Raw recovery key data
    "PBKDF2", // Algorithm used to derive the key
    false, // The key is not extractable
    ["deriveKey"] // We only allow deriving keys from this
  );

  // Derive the AES-GCM key from the baseKey using PBKDF2 and salt
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new TextEncoder().encode(salt), // Salt as Uint8Array
      iterations: iterations,
      hash: "SHA-256", // Hashing algorithm
    },
    baseKey, // The base key derived from recoveryKey
    {
      name: "AES-GCM", // Output key type (AES-GCM)
      length: 256, // Key length in bits
    },
    false, // The key is not extractable for security
    ["encrypt", "decrypt"] // Usages: encryption and decryption
  );

  return derivedKey;
};

export const encryptPrivateKey = async (
  privateKey: string,
  masterPassword: string,
  salt: string,
  iv: Uint8Array
) => {
  // Derive a key from the master password
  const masterKey = await deriveMasterKeyFromPassword(masterPassword, salt);

  if (!masterKey || isStringEmpty(masterPassword)) return "";

  // Encrypt the private key using AES-GCM
  const privateKeyBuffer = base64ToArrayBuffer(privateKey);

  // Encrypt the private key with master key
  const encryptedKey = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    masterKey,
    privateKeyBuffer
  );

  return arrayBufferToBase64(encryptedKey);
};

export const encryptPrivateKeyWithRecoverKey = async (
  privateKey: string,
  recoveryKey: string,
  salt: string,
  iv: Uint8Array
) => {
  // Derive a key from the master password
  const key = await deriveKeyFromRecoveryKey(recoveryKey, salt);

  if (!key) return "";

  // Encrypt the private key using AES-GCM
  const privateKeyBuffer = base64ToArrayBuffer(privateKey);

  // Encrypt the private key with master key
  const encryptedKey = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    privateKeyBuffer
  );

  return arrayBufferToBase64(encryptedKey);
};

export const decryptPrivateKey = async (
  encryptedData: string,
  masterPassword: string,
  salt: string,
  iv: string
) => {
  const derivedKey = await deriveMasterKeyFromPassword(masterPassword, salt);
  if (!derivedKey) return "";

  try {
    const decryptedPrivateKey = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: base64ToUint8Array(iv),
      },
      derivedKey,
      base64ToArrayBuffer(encryptedData)
    );

    return arrayBufferToBase64(decryptedPrivateKey); // The decrypted private key in Base64
  } catch (error) {
    console.error("Failed to decrypt the private key:", error);
    return "";
  }
};

export const decryptPrivateKeyWithRecoveryKey = async (
  encryptedData: string,
  recoveryKey: string,
  salt: string,
  iv: string
) => {
  const derivedKey = await deriveKeyFromRecoveryKey(recoveryKey, salt);
  if (!derivedKey) return "";

  try {
    const decryptedPrivateKey = await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: base64ToUint8Array(iv),
      },
      derivedKey,
      base64ToArrayBuffer(encryptedData)
    );

    return arrayBufferToBase64(decryptedPrivateKey); // The decrypted private key in Base64
  } catch (error) {
    console.error("Failed to decrypt the private key:", error);
    return "";
  }
};

// Generates a symmetric key for encrypting passwords
export const generateSymmetricKey = async () => {
  const symmetricKey = await crypto.subtle.generateKey(
    {
      name: "AES-GCM", // AES-GCM for strong encryption
      length: 256, // 256-bit key
    },
    true, // Extractable, so we can encrypt it with the user's public/private key pair
    ["encrypt", "decrypt"]
  );

  const exportedSymmetricKey = await crypto.subtle.exportKey(
    "raw",
    symmetricKey
  );
  return arrayBufferToBase64(exportedSymmetricKey); // Export key as Base64
};

// Encrypts the symmetric key with the user's public key (RSA-OAEP)
export const encryptSymmetricKeyWithPublicKey = async (
  symmetricKeyBase64: string,
  publicKeyBase64: string
) => {
  const symmetricKeyBuffer = base64ToArrayBuffer(symmetricKeyBase64);
  const publicKeyBuffer = base64ToArrayBuffer(publicKeyBase64);

  // Import public key
  const publicKey = await crypto.subtle.importKey(
    "spki",
    publicKeyBuffer,
    {
      name: "RSA-OAEP",
      hash: { name: "SHA-256" }, // Hashing algorithm
    },
    true, // Extractable
    ["encrypt"]
  );

  // Encrypt the symmetric key using the user's public key
  const encryptedSymmetricKey = await crypto.subtle.encrypt(
    {
      name: "RSA-OAEP",
    },
    publicKey,
    symmetricKeyBuffer
  );

  return arrayBufferToBase64(encryptedSymmetricKey);
};

// Decrypts the symmetric key using the user's private key (RSA-OAEP)
export const decryptSymmetricKeyWithPrivateKey = async (
  encryptedSymmetricKeyBase64: string,
  privateKeyBase64: string
) => {
  const encryptedSymmetricKeyBuffer = base64ToArrayBuffer(
    encryptedSymmetricKeyBase64
  );
  const privateKeyBuffer = base64ToArrayBuffer(privateKeyBase64);

  // Import private key
  const privateKey = await crypto.subtle.importKey(
    "pkcs8",
    privateKeyBuffer,
    {
      name: "RSA-OAEP",
      hash: { name: "SHA-256" },
    },
    true,
    ["decrypt"]
  );

  // Decrypt the symmetric key using the user's private key
  const decryptedSymmetricKey = await crypto.subtle.decrypt(
    {
      name: "RSA-OAEP",
    },
    privateKey,
    encryptedSymmetricKeyBuffer
  );

  return arrayBufferToBase64(decryptedSymmetricKey);
};

// Encrypts data (e.g., password) with the symmetric AES-GCM key
export const encryptData = async (
  input: string,
  symmetricKeyBase64: string,
  iv?: Uint8Array
) => {
  if (isStringEmpty(input)) return {
    encryptedData: "",
    iv: "", // Store the IV alongside the encrypted data
  };
  const symmetricKeyBuffer = base64ToArrayBuffer(symmetricKeyBase64);
  const symmetricKey = await crypto.subtle.importKey(
    "raw",
    symmetricKeyBuffer,
    "AES-GCM",
    false,
    ["encrypt"]
  );

  if (!iv) iv = crypto.getRandomValues(new Uint8Array(12)); // Generate random IV
  const encodedPassword = new TextEncoder().encode(input);

  // Encrypt password
  const encryptedPasswordBuffer = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    symmetricKey,
    encodedPassword
  );

  return {
    encryptedData: arrayBufferToBase64(encryptedPasswordBuffer),
    iv: uint8ArrayToBase64(iv), // Store the IV alongside the encrypted data
  };
};

// Decrypts data (e.g., password) with the symmetric AES-GCM key
export const decryptData = async (
  encryptedData: string,
  ivBase64: string,
  symmetricKeyBase64: string
) => {
  const symmetricKeyBuffer = base64ToArrayBuffer(symmetricKeyBase64);
  const symmetricKey = await crypto.subtle.importKey(
    "raw",
    symmetricKeyBuffer,
    "AES-GCM",
    false,
    ["decrypt"]
  );

  const iv = base64ToUint8Array(ivBase64);
  const encryptedPasswordBuffer = base64ToArrayBuffer(encryptedData);

  // Decrypt the password
  const decryptedPasswordBuffer = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    symmetricKey,
    encryptedPasswordBuffer
  );

  return new TextDecoder().decode(decryptedPasswordBuffer); // Return the decrypted password as a string
};
