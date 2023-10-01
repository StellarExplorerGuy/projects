import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "onboarding-page.html"
      },
      output: {
        entryFileNames: "onboarding.js",
      },
    },
    outDir: path.resolve(__dirname, "..", "extension"),
  }
});
