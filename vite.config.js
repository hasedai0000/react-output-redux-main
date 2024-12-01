import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/react-output-todo-react-only/",
  test: {
    global: true,
    environment: "jsdom",
    setupFiles: "src/setup.js",
  },
});
