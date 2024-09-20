// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  interface Password {
    email: string;
    password: string;
    passwordID: number;
    websiteURL: string;
    iv: string;
  }
}

export {};
