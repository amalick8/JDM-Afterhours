import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Github Pages base path
  base: "/JDM-Afterhours/",

  // Fix dev server so routing works normally during local dev
  server: {
    host: true,
  },
});
