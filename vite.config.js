import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    proxy: {
      // Browser calls /api on :5173; Vite forwards to your Node API (same as Caddy in prod).
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
