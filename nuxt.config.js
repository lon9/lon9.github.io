export default {
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: `${process.env.USER_NAME || 'rsc'}.github.io`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: `${process.env.USER_NAME || 'rsc'}'s github.io`,
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config) {
      if (process.server && process.browsesr) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
  modules: ['@nuxt/http', '@nuxtjs/pwa'],
  manifest: {
    name: `${process.env.USER_NAME || 'rsc'}.github.io`,
    short_name: `${process.env.USER_NAME || 'rsc'}.github.io`,
    description: `${process.env.USER_NAME || 'rsc'}'s github.io`,
  },
  http: {
    baseURL: 'https://api.github.com',
  },
  env: {
    userName: process.env.USER_NAME || 'rsc',
  },
}
