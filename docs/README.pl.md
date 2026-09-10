# MatteSkolan App – pełna instrukcja budowania 🇵🇱

## 1. Otwórz repozytorium
Otwórz `OskarFisk/matte-skolan-app` na GitHub i utwórz/otwórz Codespace.

## 2. Sprawdź Node.js
```bash
node --version
npm --version
```
Wymagany jest Node.js 24 lub nowszy.

## 3. Zainstaluj zależności
```bash
npm install
```
Jeśli pojawi się problem ze skryptem `electron-winstaller`:
```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Synchronizacja aplikacji webowej
```bash
npm run sync:web
```
Synchronizuje aktualną aplikację MatteSkolan oraz `rickroll.mp4`, jeśli plik istnieje, do `web/`.

## 5. Aplikacja desktopowa
```bash
npm start
npm run build:desktop
```

## 6. Przygotowanie Androida
```bash
npm run build:android
```
Jeśli brakuje TypeScript:
```bash
npm install -D typescript
npm run build:android
```
Jeśli `android/` już istnieje, użyj `npx cap sync android`.

## 7. Java 21
```bash
java -version
```
Java 25 może powodować `Unsupported class file major version 69`. Użyj Java 21.

## 8. Android SDK
Jeśli pojawi się `SDK location not found`:
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. Ścieżka SDK dla Gradle
W `android/`:
```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. Zbuduj APK
```bash
cd android
./gradlew assembleDebug --no-daemon
```
Udane budowanie kończy się komunikatem `BUILD SUCCESSFUL`.

APK:
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. Sprawdź i pobierz APK
```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```
Pobierz plik przez eksplorator plików Codespaces.

## 12. Instalacja na Androidzie
Przenieś APK na urządzenie i otwórz je. Android może wymagać zezwolenia na instalację z używanego źródła.

To jest APK debug. Publiczna wersja powinna używać podpisu release.

Więcej informacji: [`BUILDING.md`](./BUILDING.md)
