export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Upcoming Airdrops',
    titleTemplate: '%s - upcomingairdrops.com',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'},
      {
        hid: 'description', name: 'description',
        content: 'Is something down for everyone or just me? Check your favorite services are down or having problems.'
      },
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
      },
      {
        rel: "stylesheet",
        href: "/fonts/ProtoMono-Regular.otf"
      },
      {
        rel: "stylesheet",
        href: "/fonts/ProtoMono-Bold.otf"
      }
    ]
  },

  publicRuntimeConfig: {
    SITE_URI: process.env.SITE_URI,
    API_URI: process.env.API_URI
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/components/server.js'},
    {src: '~/plugins/repository/index.js'},
    {src: '~/plugins/auth'},
    {src: '~/components/client.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'vue-social-sharing/nuxt',
    ['cookie-universal-nuxt', {alias: 'ck'}],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URI
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    },
    icon: {
      iconFileName: 'icon.png'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {}
      }
    }
  }
}
