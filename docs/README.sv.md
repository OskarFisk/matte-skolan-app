# MatteSkolan App – komplett byggguide 🇸🇪

Den här guiden innehåller hela processen för att bygga MatteSkolan som desktop-app och Android-APK i GitHub Codespaces.

## 1. Öppna repot

Öppna `OskarFisk/matte-skolan-app` på GitHub och skapa/öppna ett Codespace.

## 2. Kontrollera Node.js

```bash
node --version
npm --version
```

Projektet kräver Node.js 24 eller nyare.

## 3. Installera paket

```bash
npm install
```

Om npm visar en install-script-varning kan du neka `electron-winstaller` och installera igen:

```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Synka webappen

```bash
npm run sync:web
```

Det hämtar den aktuella MatteSkolan-webbappen till `web/`, inklusive `rickroll.mp4` när filen finns i källrepot.

## 5. Desktop

Starta under utveckling:

```bash
npm start
```

Bygg desktop-paket:

```bash
npm run build:desktop
```

## 6. Android

Förbered Capacitor-projektet:

```bash
npm run build:android
```

Om TypeScript saknas:

```bash
npm install -D typescript
npm run build:android
```

Om `android/` redan finns, använd:

```bash
npx cap sync android
```

## 7. Java

Använd **Java 21** för Android-bygget. Java 25 kan ge felet `Unsupported class file major version 69`.

```bash
java -version
```

## 8. Android SDK

Om Gradle säger `SDK location not found`, installera Android Command-Line Tools och använd:

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
```

Installera SDK-delarna:

```bash
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. Ange SDK-sökvägen

Från `android/`:

```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. Bygg APK

```bash
cd android
./gradlew assembleDebug --no-daemon
```

Vid lyckat bygge visas `BUILD SUCCESSFUL`.

APK:n finns här:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. Kontrollera APK:n

```bash
ls -lh android/app/build/outputs/apk/debug/app-debug.apk
```

## 12. Hämta APK:n

Öppna mappen `android/app/build/outputs/apk/debug/` i Codespaces filutforskare och ladda ner `app-debug.apk`.

## 13. Installera på Android

Flytta APK:n till Android-enheten och öppna den. Android kan kräva att installation från den aktuella källan tillåts.

Detta är en **debug-APK**. En publik produktionsversion bör byggas med en riktig release-signering.

## Vanliga fel

- **TypeScript saknas:** `npm install -D typescript`
- **Class file major version 69:** byt till Java 21.
- **SDK location not found:** kontrollera `ANDROID_HOME`, SDK-paketen och `android/local.properties`.
- **android finns redan:** kör `npx cap sync android` istället för `npx cap add android`.

Se även [`BUILDING.md`](./BUILDING.md) för den fullständiga tekniska guiden.
