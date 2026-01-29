
module.exports = {
  titleTemplate: 'TOTP QRCode',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { hid: 'title', name: 'title', content: process.env.npm_package_name },
    { hid: 'description', name: 'description', content: 'Google Authenticator TOTP configuration from QRCode' },
    { hid: 'format-detection', name: 'format-detection', content: 'telephone=no' },

    { hid: 'msapplication-TileColor', name: 'msapplication-TileColor', content: '#ffffff' },
    { hid: 'msapplication-TileImage', name: 'msapplication-TileImage', content: '/meta/mstile-144x144.png' },
    { hid: 'msapplication-config', name: 'msapplication-config', content: '/meta/browserconfig.xml' },
    { hid: 'theme-color', name: 'theme-color', content: '#ffffff' },

    { hid: 'og:image:width', property: 'og:image:width', content: '279' },
    { hid: 'og:image:height', property: 'og:image:height', content: '279' },
    // Filled in index.vue : { property: "og:description", content: "Maison 239 m2 aux Mayons" },
    { hid: 'og:title', property: 'og:title', content: 'OG Title' },
    { hid: 'og:url', property: 'og:url', content: `https://${process.env.APP_URI}/` },
    { hid: 'og:image', property: 'og:image', content: `https://${process.env.APP_URI}/meta/og-image.jpg` },

    { hid: 'google-site-verification', property: 'google-site-verification', content: '' }

  ],
  link: [
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/meta/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/meta/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/meta/favicon-16x16.png' },
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'mask-icon', href: '/meta/safari-pinned-tab.svg', color: '#010f41' },
    { rel: 'shortcut icon', href: '/meta/favicon.ico' }
  ]
}
