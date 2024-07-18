import { darkMode } from './.nuxt/types/tailwind.config'
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
      api_url: 'http://127.0.0.1:8080',
      ws_url: 'ws://127.0.0.1:8080/ws'
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

  plugins: [
    { src: '~/plugins/websocket.ts', mode: 'server' }
  ],

  // Remove the eslint property
  // eslint: {},
  pages: true,

  components: true,

  // nitro: {},
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
  },

  compatibilityDate: '2024-07-17'
})
