import { join, resolve } from 'path'
import dotenv from 'dotenv'

dotenv.config(
  {
    path: resolve(process.cwd(), `config/env/.env.${process.env.DEPLOY_ENV}`)
  }
)

export default {
  mode: 'spa',
  head: require('./config/head.js'),
  loading: { color: '#fff' },
  css: [
    { src: join(__dirname, 'assets/stylus/main.styl'), lang: 'stylus' },
    'element-ui/lib/theme-chalk/reset.css',
    'element-ui/lib/theme-chalk/index.css'
  ],
  plugins: [
    '@/plugins/element-ui'
  ],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    '@nuxtjs/pwa',
    'nuxt-compress',
    ['nuxt-i18n', require('./config/modules/nuxt-i18n')],
    ['nuxt-stylus-resources-loader', [
      resolve(__dirname, 'assets/stylus/main.styl')
    ]],
    '@nuxtjs/markdownit'
  ],
  router: {
    base: '/',
    middleware: []
  },
  'nuxt-compress': {
    gzip: {
      cache: true
    },
    brotli: {
      threshold: 10240
    }
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    xhtmlOut: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs',
      'markdown-it-anchor',
      'markdown-it-table-of-contents'
    ]
  },
  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {}
  }
}
