import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Basic Vite config – no PWA plugin here so dev server starts cleanly.
export default defineConfig({
  plugins: [react()],
});

