# OTP QR code generator

OTP QR code generator est utilisé pour aider les utilisateurs à installer leur configuration sur leur applications OTP favorites.

## Motivations

En travaillant sur de la configuration SSH serveur nous avons décidé d'abandonner les connexions par mot de passe et d'utiliser uniquement les clés SSH. Cependant, comme nous ne pouvions pas toujours éviter les mots de passes, nous avons implémenté la double authentification pour SSH.

Une fois que l'utilisateur et sa configuration sont créés, nous avions besoin d'un moyen pour envoyer cela sur le mobile.

Pensez à lire cet article pour savoir [comment implementer 2FA SSH avec Google Authenticator](https://hackertarget.com/ssh-two-factor-google-authenticator/) (en).

## Confidentialité

Nous **ne gardons aucune donnée**.

- Pas de cookie
- Pas de localStorage
- Pas d'appel à une API
- Tout est exécuté côté client

PWA est activé si jamais vous avez besoin d'utiliser ce service hors ligne.

Dernière chose, le code est open source. Trouvez le sur Github : [github.com/spyesx/otp-qrcode](https://github.com/spyesx/otp-qrcode)

## Contributeurs

- Développé par [Nicolas Bages](#)
- Idée originale de [Jean-Christian Simonetti](#)

## Documentation

Ce générateur a été développé à l'origine pour respecter le [Key Uri Format](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) de Google Authenticator (maintenant archivé). Il a été testé aussi avec Authy.

### Applications mobiles

- [Authy](https://authy.com/download/) (iOS, Android)
- Google Authenticator ([iOS](https://apps.apple.com/us/app/google-authenticator/id388497605), [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en))

### Applications fixes

- [WinAuth](https://winauth.github.io/winauth/download.html) (Windows)
- [Authy](https://authy.com/download/) (macOS, Windows, Google Chrome)

## Licence

## Outils utilisés

- [Nuxt](https://github.com/nuxt/nuxt)
- [Nuxt Content](https://content.nuxt.com/)
- [Nuxt UI](https://ui.nuxt.com/)
- [QRCode](https://github.com/soldair/node-qrcode)
- et tout ce que vous pouvez trouver dans [`package.json`](https://github.com/Weinto/otp-qrcode/blob/master/package.json)
