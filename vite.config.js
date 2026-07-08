import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const cleanRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: cleanRoot,
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5175,
    strictPort: true,
  },
});
