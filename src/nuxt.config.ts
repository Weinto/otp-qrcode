import { VitePWA } from 'vite-plugin-pwa'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  devServer: {
    host: '0.0.0.0'
  },

  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'OTP QRCode',
          short_name: 'OTP QRCode',
          description: 'A simple page to quickly install your Google Authenticator compatible TOTP configuration from a QRCode',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'icon.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        },
        workbox: {
          navigateFallback: null
        },
        devOptions: {
          enabled: true,
          type: 'module'
        }
      })
    ]
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      { code: 'en', file: 'en.json', name: 'English' },
      { code: 'fr', file: 'fr.json', name: 'Français' }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix'
  },

  content: {
    // Content module configuration
    highlight: {
      theme: 'github-light'
    }
  }
})
