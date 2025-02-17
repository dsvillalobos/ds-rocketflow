import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      manifest: {
        name: "DS RocketFlow",
        short_name: "DS RocketFlow",
        description: "Storage at Rocket Speed.",
        theme_color: "#392d69",
        background_color: "#392d69",
        display: "standalone",
        lang: "en-US",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/icons/icon-1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
          },
          {
            src: "/icons/icon-1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        screenshots: [
          {
            src: "/mobile-screenshots/ds-rocketflow-dashboard.png",
            sizes: "586x1041",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/mobile-screenshots/effortless-storage.png",
            sizes: "586x1041",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/mobile-screenshots/rocketflow-ai.png",
            sizes: "586x1041",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/mobile-screenshots/sync-across-all-devices.png",
            sizes: "586x1041",
            type: "image/png",
            form_factor: "narrow",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
  },
});
