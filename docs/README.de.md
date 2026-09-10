# MatteSkolan App – vollständige Build-Anleitung 🇩🇪

## 1. Repository öffnen
Öffne `OskarFisk/matte-skolan-app` auf GitHub und erstelle/öffne einen Codespace.

## 2. Node.js prüfen
```bash
node --version
npm --version
```
Node.js 24 oder neuer wird benötigt.

## 3. Abhängigkeiten installieren
```bash
npm install
```
Falls ein Install-Script-Problem mit `electron-winstaller` erscheint:
```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Web-App synchronisieren
```bash
npm run sync:web
```
Dabei werden die aktuelle MatteSkolan-Web-App und `rickroll.mp4`, sofern vorhanden, nach `web/` synchronisiert.

## 5. Desktop-App
```bash
npm start
npm run build:desktop
```

## 6. Android vorbereiten
```bash
npm run build:android
```
Falls TypeScript fehlt:
```bash
npm install -D typescript
npm run build:android
```
Wenn `android/` bereits existiert, benutze `npx cap sync android`.

## 7. Java 21 verwenden
Prüfen:
```bash
java -version
```
Java 25 kann `Unsupported class file major version 69` verursachen. Für dieses Projekt Java 21 verwenden.

## 8. Android SDK
Bei `SDK location not found`:
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. Gradle SDK-Pfad setzen
Im Ordner `android/`:
```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. APK bauen
```bash
cd android
./gradlew assembleDebug --no-daemon
```
Bei Erfolg erscheint `BUILD SUCCESSFUL`.

APK:
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. APK prüfen und herunterladen
```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```
Lade die Datei über den Codespaces-Dateiexplorer herunter.

## 12. Android installieren
Übertrage die APK auf das Android-Gerät und öffne sie. Android kann die Installation aus der verwendeten Quelle erlauben müssen.

Dies ist eine Debug-APK. Für eine öffentliche Version sollte eine Release-Signatur verwendet werden.

Weitere Details: [`BUILDING.md`](./BUILDING.md)
