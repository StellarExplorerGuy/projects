import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "chrome-service-worker.js",
        "chrome-service-worker": "chrome-service-worker.js",
      },
      output: {
        entryFileNames: "service-worker.js",
      },
    },
    outDir: path.resolve(__dirname, "..", "chrome"),
  },
});
