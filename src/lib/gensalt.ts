import { setSalt } from "./session";

const BCRYPT_SALT_LENGTH = 22;

export const genSalt = async (
  email: string,
  password: string,
  rounds = 10
): Promise<string> => {
  // Use email as the salt
  const emailSalt = hashEmail(email);
  const combined = emailSalt + password;
  const hash = await hashString(combined);

  const bcryptSalt = hash.slice(0, BCRYPT_SALT_LENGTH);
  const newSalt = `$2a$${rounds.toString().padStart(2, "0")}$${bcryptSalt}`;

  // Store the salt in the session (optional, as it can be regenerated from email)
  setSalt(newSalt);

  return newSalt;
};

const hashEmail = (email: string): string => {
  // Simple hash function for email
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36); // Convert to base 36 for shorter string
};

const hashString = async (input: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);

  // Create a SHA-256 hash of the input string
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);

  // Convert the hash buffer to a Base64 string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashBase64 = btoa(String.fromCharCode(...hashArray));

  // Make the Base64 string bcrypt-compatible
  return hashBase64.replace(/\+/g, ".").replace(/\//g, "/");
};

// Usage example
export const hashPassword = async (
  email: string,
  password: string
): Promise<string> => {
  const salt = await genSalt(email, password);
  const hashedPassword = await hashString(salt + password);
  return hashedPassword;
};
