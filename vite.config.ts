import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: resolve(__dirname, "./src/main.tsx"),
      output: {
        format: "iife",
        dir: resolve(__dirname, "./dist"),
        entryFileNames: "script.js",
        assetFileNames: "style.css",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
