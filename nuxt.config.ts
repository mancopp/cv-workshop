import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "shadcn-nuxt",
    "nuxt-electron",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],
  ssr: false,

  // FIXME: nuxt-electron seems to have some kind of issue with 404 atm.
  // It is mainly caused by the buildAssetsDir being overriden to '/'.
  // It is done so to make the app build correctly, but it throws a 404 error when the app is running in dev mode.
  // So this will be a quick fix to let me work on the app, I'll look into it later.
  app: {
    baseURL: "./",
    // buildAssetsDir: '/',
  },
  runtimeConfig: {
    app: {
      baseURL: "./",
      // buildAssetsDir: '/',
    },
  },
  nitro: {
    runtimeConfig: {
      app: {
        baseURL: "./",
      },
    },
  },
  // router: {
  //   options: {
  //     hashMode: true,
  //   },
  // },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  electron: {
    build: [
      {
        entry: "electron/main.ts",
      },
      {
        entry: "electron/preload.ts",
        onstart(args) {
          // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
          // instead of restarting the entire Electron App.
          args.reload();
        },
      },
    ],
    renderer: {},
    disableDefaultOptions: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  colorMode: {
    classSuffix: "",
  },
  compatibilityDate: "2025-04-17",
});
