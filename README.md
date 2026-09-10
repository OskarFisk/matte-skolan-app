# MatteSkolan App 📚

Desktop- och Android-paketering för **MatteSkolan**.

## 🚀 Snabbstart

Projektet kan byggas i GitHub Codespaces eller med GitHub Actions.

```bash
npm install
npm run sync:web
```

### Desktop

```bash
npm start
npm run build:desktop
```

### Android APK

```bash
npm run build:android
cd android
./gradlew assembleDebug --no-daemon
```

APK-resultatet finns normalt här:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 📖 Build-guider på flera språk

- 🇸🇪 [Svenska](docs/README.sv.md)
- 🇬🇧 [English / Full technical guide](docs/BUILDING.md)
- 🇩🇪 [Deutsch](docs/README.de.md)
- 🇪🇸 [Español](docs/README.es.md)
- 🇫🇷 [Français](docs/README.fr.md)
- 🇮🇹 [Italiano](docs/README.it.md)
- 🇵🇱 [Polski](docs/README.pl.md)
- 🇳🇱 [Nederlands](docs/README.nl.md)
- 🇧🇷 [Português (Brasil)](docs/README.pt-BR.md)
- 🇯🇵 [日本語](docs/README.ja.md)
- 🇨🇳 [简体中文](docs/README.zh-CN.md)
- 🇷🇺 [Русский](docs/README.ru.md)

Den tekniska masterguiden finns i [`docs/BUILDING.md`](docs/BUILDING.md).

## 🧰 Viktiga krav

- Node.js 24+
- Java 21 för Android-bygget
- Android SDK med `platform-tools`, Android API 36 och Build Tools 36.0.0
- Capacitor 8
- Electron 44
- GitHub Codespaces fungerar som rekommenderad browser-baserad byggmiljö

## 📦 Output

GitHub Actions är konfigurerat för separata desktop-outputar:

- Windows: NSIS + portable
- Linux: AppImage + Debian package
- macOS: DMG
- Android: separat debug APK

## 🏗️ Arkitektur

- `electron/` – desktop-skalet
- `capacitor.config.ts` – Android-konfiguration (`com.matteskolan.app`)
- `scripts/sync-web.cjs` – hämtar aktuell webapp från `OskarFisk/matte-skolan`
- `web/` – synkroniserad webapp
- `docs/` – flerspråkig bygg- och felsökningsdokumentation
- `android/` – genererat Capacitor Android-projekt

## ⚠️ Felsökning

### TypeScript saknas

```bash
npm install -D typescript
npm run build:android
```

### `Unsupported class file major version 69`

Byt till Java 21. Java 25 kan ge detta fel med projektets Gradle/Groovy-kedja.

### `SDK location not found`

Kontrollera `ANDROID_HOME`, installera rätt Android SDK-paket och skapa `android/local.properties` med:

```text
sdk.dir=/home/codespace/Android/Sdk
```

Använd din faktiska sökväg om den skiljer sig.

### `android/` finns redan

Kör:

```bash
npx cap sync android
```

Kör inte `npx cap add android` igen om plattformen redan finns.

## 🔐 APK-information

`app-debug.apk` är en debug-version av appen. För en publik release bör projektet byggas med en skyddad release-signering och lämplig versionshantering.

## 🔄 Synkronisering

Build-scriptet synkroniserar den aktuella offentliga webappen från `OskarFisk/matte-skolan` vid build. Om webbrepot ändras behöver appen byggas om för att få de nya ändringarna.
