import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/color-mode", "shadcn-nuxt"],
  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],
  // Enable SSG
  ssr: false,
  // Enables the development server to be discoverable by other devices when running on iOS physical devices
  devServer: { host: process.env.TAURI_DEV_HOST || "localhost" },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    // Better support for Tauri CLI output
    clearScreen: false,
    envPrefix: ["VITE_"],
    // server: {
    //   // Tauri requires a consistent port
    //   strictPort: true,
    // },
    resolve: {
      alias: {
        'html2canvas': path.resolve(__dirname, 'node_modules/html2canvas-pro')
      },
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: ''
  }
});
