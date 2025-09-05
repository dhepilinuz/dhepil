import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  server: {
    port: 3000,
    strictPort: true
    // butuh backend nanti:
    // proxy: { "/api": { target: "http://localhost:8000", changeOrigin: true, rewrite: p => p.replace(/^\/api/, "") } }
  },
  optimizeDeps: {
    include: ["react", "react-dom", "three"]
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          three: ["three"]
        }
      }
    }
  }
});
