# MatteSkolan App – guía completa de compilación 🇪🇸

## 1. Abrir el repositorio
Abre `OskarFisk/matte-skolan-app` en GitHub y crea/abre un Codespace.

## 2. Comprobar Node.js
```bash
node --version
npm --version
```
Se necesita Node.js 24 o superior.

## 3. Instalar dependencias
```bash
npm install
```
Si aparece un problema con el script de `electron-winstaller`:
```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Sincronizar la aplicación web
```bash
npm run sync:web
```
Esto sincroniza la aplicación web actual de MatteSkolan y `rickroll.mp4`, si existe, en `web/`.

## 5. Aplicación de escritorio
```bash
npm start
npm run build:desktop
```

## 6. Preparar Android
```bash
npm run build:android
```
Si falta TypeScript:
```bash
npm install -D typescript
npm run build:android
```
Si `android/` ya existe, usa `npx cap sync android`.

## 7. Usar Java 21
```bash
java -version
```
Java 25 puede producir `Unsupported class file major version 69`. Usa Java 21.

## 8. Android SDK
Si aparece `SDK location not found`:
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. Configurar la ruta del SDK
Desde `android/`:
```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. Crear el APK
```bash
cd android
./gradlew assembleDebug --no-daemon
```
Debe aparecer `BUILD SUCCESSFUL` si todo funciona.

APK:
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. Comprobar y descargar
```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```
Descarga el archivo desde el explorador de archivos de Codespaces.

## 12. Instalar en Android
Transfiere el APK al dispositivo Android y ábrelo. Puede ser necesario permitir instalaciones desde la fuente utilizada.

Es un APK de depuración. Para una versión pública debe utilizarse una firma de lanzamiento.

Más detalles: [`BUILDING.md`](./BUILDING.md)
