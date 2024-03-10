import { darkMode } from './.nuxt/types/tailwind.config';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  runtimeConfig: {
    private: {
      api_url: 'http://127.0.0.1:8080'
      // search_url: 'http://172.0.0.1:7700'
    }
  },
  css: ['@/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: ['@nuxt/image' // '@nuxt/content',
    // '@nuxtjs/partytown',
    // 'nuxt-meilisearch',
    // '@nuxt/devtools',
    // '@vee-validate/nuxt'
    // '@nuxtjs/eslint-module'
  ],
  // meilisearch: {
  //    hostUrl: process.env.SEARCH_URL || 'http://127.0.0.1:7700',
  //    searchApiKey: 'b44b19bc4d8b02f55e48c730bb82e336e9579bf9e91de6d30138f34a18fa3331',
  //    adminApiKey: '2f84e9afcb212d9c3876aae549b73a049ee0701117bd2c6f3c20317893be9b35',
  //    serverSideUsage: true,
  //    instantSearch: {
  //        theme: 'algolia',
  //    },
  // },
  eslint: {},
  pages: true,
  components: true,
  nitro: {
    //    enabled: true,
  },
  app: {
    head: {
      title: 'Animanga',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        // { charset: 'utf-8' },
        // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // { name: 'lang', content: 'en' },
        { name: 'description', content: 'Anime and Manga Web App with Nuxt.js' },
        { property: 'og:title', content: 'Animanga' },
        { property: 'og:description', content: 'Anime and Manga Web App with Nuxt.js' }
      ]
    }
  }
})
