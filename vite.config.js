import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import TRADING from "./.env";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/trading212": {
        target: "https://live.trading212.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/trading212/, "/api/v0"),
        headers: {
          Authorization: "Bearer "+TRADING,
          Origin: "https://live.trading212.com",
        },
      },
    },
  },
});
