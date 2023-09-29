import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "firefox-service-worker.js",
        "firefox-service-worker": "firefox-service-worker.js",
      },
      output: {
        entryFileNames: "service-worker.js",
      },
    },
    outDir: path.resolve(__dirname, "..", "firefox"),
  },
});
