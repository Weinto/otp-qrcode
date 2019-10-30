module.exports = {
  locales: [
    { code: 'fr', iso: 'fr-FR' },
    { code: 'en', iso: 'en-EN' }
  ],
  defaultLocale: 'fr',
  strategy: 'prefix',
  rootRedirect: 'fr',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected'
  },
  vueI18nLoader: true,
  vueI18n: require('./vueI18n'),
  parsePages: false, // Disable acorn parsing
  pages: require('./pages.js'),
  vuex: {
    syncLocale: true,
    syncMessages: true,
    syncRouteParams: true
  }
}
