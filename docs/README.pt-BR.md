# MatteSkolan App – guia completo de compilação 🇧🇷

## 1. Abrir o repositório
Abra `OskarFisk/matte-skolan-app` no GitHub e crie/abra um Codespace.

## 2. Verificar Node.js
```bash
node --version
npm --version
```
É necessário Node.js 24 ou mais recente.

## 3. Instalar dependências
```bash
npm install
```
Se houver um aviso relacionado ao script de instalação de `electron-winstaller`:
```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Sincronizar o app web
```bash
npm run sync:web
```
Isso sincroniza o app web atual do MatteSkolan e `rickroll.mp4`, quando o arquivo existe, para `web/`.

## 5. Aplicativo desktop
```bash
npm start
npm run build:desktop
```

## 6. Preparar Android
```bash
npm run build:android
```
Se o TypeScript estiver ausente:
```bash
npm install -D typescript
npm run build:android
```
Se `android/` já existir, use `npx cap sync android`.

## 7. Usar Java 21
```bash
java -version
```
Java 25 pode causar `Unsupported class file major version 69`. Use Java 21.

## 8. Android SDK
Se aparecer `SDK location not found`:
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. Definir o caminho do SDK
Dentro de `android/`:
```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. Criar o APK
```bash
cd android
./gradlew assembleDebug --no-daemon
```
Um build bem-sucedido mostra `BUILD SUCCESSFUL`.

APK:
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. Verificar e baixar
```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```
Baixe o arquivo pelo explorador de arquivos do Codespaces.

## 12. Instalar no Android
Transfira o APK para o dispositivo Android e abra-o. Talvez seja necessário permitir instalações da fonte usada.

Este é um APK de debug. Uma versão pública deve usar uma assinatura de release.

Mais detalhes: [`BUILDING.md`](./BUILDING.md)
