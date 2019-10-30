module.exports = {
  fallbackLocale: 'fr',
  silentTranslationWarn: true,
  dateTimeFormats: {
    'fr': require('./fr-FR/dateTimeFormats.js'),
    'en': require('./en-EN/dateTimeFormats.js')
  },
  numberFormats: {
    'fr': require('./fr-FR/numberFormats.js'),
    'en': require('./en-EN/numberFormats.js')
  },
  messages: {
    'fr': require('./fr-FR/messages.js'),
    'en': require('./en-EN/messages.js')
  }
}
