VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["logo.jpeg", "vite.svg"],
  devOptions: {
    enabled: true,
  },
  manifest: {
    name: "Manaf Clothing",
    short_name: "Manaf",
    description: "Quality men's fashion wear.",
    theme_color: "#ffffff",
    background_color: "#ffffff",

    // 👇 IMPORTANT
    start_url: "/admin",
    scope: "/",

    display: "standalone",
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
    navigateFallback: "/admin",
    globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
  },
});
