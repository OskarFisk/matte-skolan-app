# MatteSkolan App – guide complet de compilation 🇫🇷

## 1. Ouvrir le dépôt
Ouvrez `OskarFisk/matte-skolan-app` sur GitHub et créez/ouvrez un Codespace.

## 2. Vérifier Node.js
```bash
node --version
npm --version
```
Node.js 24 ou supérieur est requis.

## 3. Installer les dépendances
```bash
npm install
```
Si un problème de script d’installation concerne `electron-winstaller` :
```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Synchroniser l’application web
```bash
npm run sync:web
```
Les fichiers actuels de MatteSkolan et `rickroll.mp4` (s’il existe) sont synchronisés dans `web/`.

## 5. Application desktop
```bash
npm start
npm run build:desktop
```

## 6. Préparer Android
```bash
npm run build:android
```
Si TypeScript est absent :
```bash
npm install -D typescript
npm run build:android
```
Si `android/` existe déjà, utilisez `npx cap sync android`.

## 7. Utiliser Java 21
```bash
java -version
```
Java 25 peut provoquer `Unsupported class file major version 69`. Utilisez Java 21.

## 8. Android SDK
Pour `SDK location not found` :
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. Définir le chemin du SDK
Depuis `android/` :
```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. Construire l’APK
```bash
cd android
./gradlew assembleDebug --no-daemon
```
Un build réussi affiche `BUILD SUCCESSFUL`.

APK :
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. Vérifier et télécharger
```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```
Téléchargez le fichier avec l’explorateur de fichiers Codespaces.

## 12. Installer sur Android
Transférez l’APK sur l’appareil Android et ouvrez-le. Android peut demander l’autorisation d’installer depuis la source utilisée.

Il s’agit d’un APK de débogage. Une version publique doit utiliser une signature de production.

Plus de détails : [`BUILDING.md`](./BUILDING.md)
