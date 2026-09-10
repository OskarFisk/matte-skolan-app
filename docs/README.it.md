# MatteSkolan App – guida completa alla compilazione 🇮🇹

## 1. Aprire il repository
Apri `OskarFisk/matte-skolan-app` su GitHub e crea/apri un Codespace.

## 2. Controllare Node.js
```bash
node --version
npm --version
```
È richiesto Node.js 24 o superiore.

## 3. Installare le dipendenze
```bash
npm install
```
Se compare un problema con lo script di `electron-winstaller`:
```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Sincronizzare l’app web
```bash
npm run sync:web
```
Sincronizza l’app web MatteSkolan corrente e `rickroll.mp4`, se presente, nella cartella `web/`.

## 5. App desktop
```bash
npm start
npm run build:desktop
```

## 6. Preparare Android
```bash
npm run build:android
```
Se manca TypeScript:
```bash
npm install -D typescript
npm run build:android
```
Se `android/` esiste già, usa `npx cap sync android`.

## 7. Usare Java 21
```bash
java -version
```
Java 25 può causare `Unsupported class file major version 69`. Usa Java 21.

## 8. Android SDK
Per `SDK location not found`:
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. Impostare il percorso SDK
Da `android/`:
```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. Compilare l’APK
```bash
cd android
./gradlew assembleDebug --no-daemon
```
Il risultato corretto mostra `BUILD SUCCESSFUL`.

APK:
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. Controllare e scaricare
```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```
Scarica il file dall’esplora file di Codespaces.

## 12. Installare su Android
Trasferisci l’APK sul dispositivo Android e aprilo. Android potrebbe richiedere il permesso per installare app dalla fonte utilizzata.

È un APK di debug. Per una versione pubblica bisogna usare una firma release.

Dettagli: [`BUILDING.md`](./BUILDING.md)
