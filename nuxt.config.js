export default {
  ssr: false,
  target: 'universal',
  head: {
    title: 'Movie Recommender System',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Movie Recommender System' },
      {
        hid: 'keywords',
        name: 'keywords',
        content: 'movie recommender system'
      },
      { hid: 'og:title', name: 'og:title', content: 'Inverted Index' },
      { hid: 'og:description', name: 'og:description', content: 'Inverted Index' },
      { hid: 'og:image', name: 'og:image', content: '/site.png' },
      { hid: 'og:site_name', name: 'og:site_name', content: 'Inverted Index' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'msapplication', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', size: '180x180', href: '/icons/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', size: '32x32', href: '/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', size: '16x16', href: '/icons/favicon-16x16.png' },
      { rel: 'manifest', href: '/icons/site.webmanifest' },
      { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', content: '#5bbad5' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500&display=swap' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.15.3/css/all.css' }
    ]
  },
  css: [
  ],
  plugins: [
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build',
  ],
  modules: [
    'nuxt-buefy',
  ],
  build: {
    extend (config) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  serverMiddleware: [
    './serverMiddleware/server', { path: 'server', handler: './serverMiddleware/server.ts' }
  ],
  server: {
    port: 8080
  }
}
