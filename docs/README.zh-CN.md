# MatteSkolan App – 完整构建指南 🇨🇳

## 1. 打开仓库
在 GitHub 打开 `OskarFisk/matte-skolan-app`，创建或打开 Codespace。

## 2. 检查 Node.js
```bash
node --version
npm --version
```
需要 Node.js 24 或更高版本。

## 3. 安装依赖
```bash
npm install
```
如果出现 `electron-winstaller` 安装脚本问题：
```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. 同步 Web 应用
```bash
npm run sync:web
```
这会把当前 MatteSkolan Web 应用同步到 `web/`，如果源仓库存在，也会包含 `rickroll.mp4`。

## 5. 桌面应用
```bash
npm start
npm run build:desktop
```

## 6. 准备 Android
```bash
npm run build:android
```
如果缺少 TypeScript：
```bash
npm install -D typescript
npm run build:android
```
如果 `android/` 已经存在，请使用 `npx cap sync android`。

## 7. 使用 Java 21
```bash
java -version
```
Java 25 可能导致 `Unsupported class file major version 69`。请使用 Java 21。

## 8. Android SDK
如果出现 `SDK location not found`：
```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

## 9. 设置 SDK 路径
在 `android/` 中执行：
```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

## 10. 构建 APK
```bash
cd android
./gradlew assembleDebug --no-daemon
```
成功后会显示 `BUILD SUCCESSFUL`。

APK：
```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. 检查并下载 APK
```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```
通过 Codespaces 文件浏览器下载该文件。

## 12. 安装到 Android
将 APK 传到 Android 设备并打开。Android 可能需要允许从当前来源安装应用。

这是 debug APK。公开发布版本应使用 release 签名。

更多详情：[`BUILDING.md`](./BUILDING.md)
