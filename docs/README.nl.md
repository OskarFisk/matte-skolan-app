# MatteSkolan App – volledige buildhandleiding 🇳🇱

## 1. Repository openen
Open `OskarFisk/matte-skolan-app` op GitHub en maak/open een Codespace.

## 2. Node.js controleren
```bash
node --version
npm --version
```
Node.js 24 of nieuwer is vereist.

## 3. Afhankelijkheden installeren
```bash
npm install
```
Bij een install-scriptprobleem met `electron-winstaller`:
```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Webapp synchroniseren
```bash
npm run sync:web
```
Dit synchroniseert de huidige MatteSkolan-webapp en `rickroll.mp4` als die bestaat naar `web/`.

## 5. Desktop-app
```bash
npm start
npm run build:desktop
```

## 6. Android voorbereiden
```bash
npm run build:android
```
Als TypeScript ontbreekt:
```bash
npm install -D typescript
npm run build:android
```
Als `android/` al bestaat, gebruik `npx cap sync android`.

## 7. Java 21 gebruiken
```bash
java -version
```
Java 25 kan `Unsupported class file major version 69` veroorzaken. Gebruik Java 21.

## 8. Android SDK
Bij `SDK location not found`:
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. SDK-pad instellen
In `android/`:
```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. APK bouwen
```bash
cd android
./gradlew assembleDebug --no-daemon
```
Een geslaagde build eindigt met `BUILD SUCCESSFUL`.

APK:
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. Controleren en downloaden
```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```
Download het bestand via de Codespaces-bestandsverkenner.

## 12. Installeren op Android
Zet de APK op het Android-apparaat en open deze. Android kan toestemming vragen voor installatie vanuit de gebruikte bron.

Dit is een debug-APK. Een publieke release moet met een release-handtekening worden gebouwd.

Meer details: [`BUILDING.md`](./BUILDING.md)
