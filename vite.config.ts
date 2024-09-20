import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 8080,
    proxy: {
      "/api/": {
        target: "http://localhost:8080/api/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
