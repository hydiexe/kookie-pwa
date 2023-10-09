// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  pages: true,

  modules: [
      'nuxt-icon',
      '@nuxtjs/tailwindcss',
      '@nuxtjs/supabase',
      '@pinia/nuxt',
      "@vite-pwa/nuxt",
  ],

  supabase: {
    redirect: false
  },

  runtimeConfig: {
    public: {
      bucketUrl: process.env.BUCKET_URL
    },
  },

  devtools: { enabled: true },

  pwa: {
    workbox:{
      globDirectory: 'D:/hydie.exe/kookie-pwa/.nuxt/dev-sw-dist',

      globPatterns: [
        '**/*.{js,css,html}',
      ],

      globIgnores: [
        '**/node_modules/**/*',
        'sw.js',
        'workbox-*.js',
      ],
    },

    manifest: {
      name: "Kookie - Share Recipe",
      short_name: "Kookie",
      description: "This is a Kookie",
      theme_color: "#000000",
      icons: [
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    }
  }
})
