// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: false,

        timeline: {
            enabled: true,
        },
    },
    pages: true,
    nitro: {},
    css: ['@/assets/css/main.css'],
    runtimeConfig: {
        private: {
            api_url: process.env.API_URL || 'http://127.0.0.1:8080',
            search_url: process.env.SEARCH_URL || 'http://127.0.0.1:7700',
        },
    },
    modules: [
        //'@nuxt/image',
        //'@nuxt/content',
        //'@nuxtjs/partytown',
        'nuxt-meilisearch',
        '@nuxt/ui',
        //'@nuxt/devtools',
    ],
    meilisearch: {
        hostUrl: process.env.SEARCH_URL || 'http://127.0.0.1:7700',
        searchApiKey: 'b44b19bc4d8b02f55e48c730bb82e336e9579bf9e91de6d30138f34a18fa3331',
        adminApiKey: '2f84e9afcb212d9c3876aae549b73a049ee0701117bd2c6f3c20317893be9b35',
        serverSideUsage: true,
        instantSearch: {
            theme: 'algolia',
        },
    },
})
