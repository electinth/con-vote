const BASE_URL = 'https://elect.in.th/con-vote/'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Live! โหวตผ่าน-ไม่ผ่าน 7 มติแก้รัฐธรรมนูญ',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'จับตาผลการลงมติ ส.ส.-ส.ว. รายคน 17-18 พ.ย. 63',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Live! โหวตผ่าน-ไม่ผ่าน 7 มติแก้รัฐธรรมนูญ',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'จับตาผลการลงมติ ส.ส.-ส.ว. รายคน 17-18 พ.ย. 63',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: BASE_URL + 'og_image.png',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: BASE_URL,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Live! โหวตผ่าน-ไม่ผ่าน 7 มติแก้รัฐธรรมนูญ',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'จับตาผลการลงมติ ส.ส.-ส.ว. รายคน 17-18 พ.ย. 63',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image:src',
        content: BASE_URL + 'og_image.png',
      },
      {
        hid: 'twitter:url',
        property: 'twitter:url',
        content: BASE_URL,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/con-vote/favicon.ico' },
    ],
  },

  generate: {
    dir: 'dist/con-vote',
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['element-ui/lib/theme-chalk/index.css', '~/assets/styles/main.scss'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/element-ui'],

  router: {
    base: '/con-vote/',
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxtjs/style-resources'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],
  styleResources: {
    scss: ['~/assets/styles/variables.scss'],
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  },
}
