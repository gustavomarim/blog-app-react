import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    testMatch: ["./tests/**/*.test.tsx"],
    globals: true,
    coverage: {
      provider: "istanbul", // or 'v8'
      reporter: ["text", "json", "html"],
    },
  },
});
