# MatteSkolan App — полная инструкция по сборке 🇷🇺

## 1. Открыть репозиторий
Откройте `OskarFisk/matte-skolan-app` на GitHub и создайте/откройте Codespace.

## 2. Проверить Node.js
```bash
node --version
npm --version
```
Требуется Node.js 24 или новее.

## 3. Установить зависимости
```bash
npm install
```
Если возникает проблема со скриптом установки `electron-winstaller`:
```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Синхронизировать Web-приложение
```bash
npm run sync:web
```
Текущая версия MatteSkolan и `rickroll.mp4`, если файл существует, синхронизируются в `web/`.

## 5. Desktop-приложение
```bash
npm start
npm run build:desktop
```

## 6. Подготовить Android
```bash
npm run build:android
```
Если отсутствует TypeScript:
```bash
npm install -D typescript
npm run build:android
```
Если папка `android/` уже существует, используйте `npx cap sync android`.

## 7. Использовать Java 21
```bash
java -version
```
Java 25 может вызвать `Unsupported class file major version 69`. Используйте Java 21.

## 8. Android SDK
При ошибке `SDK location not found`:
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. Указать путь SDK
В каталоге `android/`:
```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. Собрать APK
```bash
cd android
./gradlew assembleDebug --no-daemon
```
При успешной сборке появится `BUILD SUCCESSFUL`.

APK:
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. Проверить и скачать
```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```
Скачайте файл через проводник Codespaces.

## 12. Установить на Android
Перенесите APK на Android-устройство и откройте его. Android может запросить разрешение на установку из используемого источника.

Это debug APK. Для публичной версии следует использовать release-подпись.

Подробнее: [`BUILDING.md`](./BUILDING.md)
