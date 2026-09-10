# MatteSkolan App – 完全ビルドガイド 🇯🇵

## 1. リポジトリを開く
GitHub の `OskarFisk/matte-skolan-app` を開き、Codespace を作成または開きます。

## 2. Node.js を確認
```bash
node --version
npm --version
```
Node.js 24 以上が必要です。

## 3. 依存関係をインストール
```bash
npm install
```
`electron-winstaller` の install script に関する問題が出た場合：
```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Web アプリを同期
```bash
npm run sync:web
```
現在の MatteSkolan Web アプリと、存在する場合は `rickroll.mp4` を `web/` に同期します。

## 5. デスクトップ版
```bash
npm start
npm run build:desktop
```

## 6. Android を準備
```bash
npm run build:android
```
TypeScript がない場合：
```bash
npm install -D typescript
npm run build:android
```
`android/` がすでに存在する場合は `npx cap sync android` を使用します。

## 7. Java 21 を使用
```bash
java -version
```
Java 25 では `Unsupported class file major version 69` が発生する場合があります。Java 21 を使用してください。

## 8. Android SDK
`SDK location not found` が出た場合：
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. SDK パスを設定
`android/` 内で：
```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. APK をビルド
```bash
cd android
./gradlew assembleDebug --no-daemon
```
成功すると `BUILD SUCCESSFUL` が表示されます。

APK:
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. APK を確認・ダウンロード
```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```
Codespaces のファイルエクスプローラーからダウンロードします。

## 12. Android にインストール
APK を Android 端末へ移して開きます。使用したインストール元からのインストールを Android が許可する必要がある場合があります。

これは debug APK です。公開版では release 用の署名を使用してください。

詳細: [`BUILDING.md`](./BUILDING.md)
