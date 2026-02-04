import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.jpeg", "vite.svg"],
      manifest: {
        name: "Manaf Clothing",
        short_name: "Manaf",
        description: "Quality men's fashiion wear.",
        theme_color: "#ffffff",
        start_url: "/admin",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "https://placehold.co/192x192/png?text=Manaf",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "https://placehold.co/512x512/png?text=Manaf",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
