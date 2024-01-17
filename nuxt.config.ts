// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  head: {
    link: [
      // Add this link for Bootstrap Icons
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.7.2/font/bootstrap-icons.min.css'
      }
    ]
  },
  plugins: ['~/plugins/bootstrap.js'],
  css: ['bootstrap/dist/css/bootstrap.css'],
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'http://localhost:8080/academics/api'
    }
  },
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt'
  ]
})
