# OTP QR code generator

OTP QR code generator is used to help users to install their configuration on their favourite mobile OTP app.

## Motivations

Working on SSH configuration we decided to get rid of SSH connexion with passwords to use only SSH keys. However, as we couldn't always avoid passwords we've decided to implement SSH with 2FA.

Once the user and the configuration are created, we needed a way to send it to the device.

Read more on this post to know [how to implement 2FA SSH with Google Authenticator](https://hackertarget.com/ssh-two-factor-google-authenticator/).

## Privacy

We **do not** store any data.

- No cookie
- No localStorage
- No API call
- Everything is client based

PWA is enabled if ever you need to use this service offline.

Last but not least, the code is open source. Find it on Github : [github.com/#/otp-qrcode](https://github.com/#/otp-qrcode)

## Contributors

- Made by [Nicolas Bages](https://www.spyesx.fr)
- Original idea from [Jean-Christian Simonetti](https://www.elysiria.fr)

## Documentation

This 2FA QR code generator was originaly made to be complient with the Google Authenticator [Key Uri Format](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) (now archived). It's been tested also with Authy.

### Mobile apps

- [Authy](https://authy.com/download/) (iOS, Android)
- Google Authenticator ([iOS](https://apps.apple.com/us/app/google-authenticator/id388497605), [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en))

### Desktop apps

- [WinAuth](https://winauth.github.io/winauth/download.html) (Windows)
- [Authy](https://authy.com/download/) (macOS, Windows, Google Chrome)

## Licence

## Uses

- [Nuxt](https://github.com/nuxt/nuxt)
- [Nuxt Content](https://content.nuxt.com/)
- [Nuxt UI](https://ui.nuxt.com/)
- [QRCode](https://github.com/soldair/node-qrcode)
- and everything found in [`package.json`](https://github.com/Weinto/otp-qrcode/blob/master/package.json)
