# MatteSkolan App — Complete Build Guide

This guide documents the complete process used to build the desktop application and Android APK in GitHub Codespaces.

## 1. Open the repository

Open `OskarFisk/matte-skolan-app` in GitHub and create/open a Codespace.

## 2. Check Node.js

```bash
node --version
npm --version
```

The project requires Node.js 24 or newer.

## 3. Install dependencies

```bash
npm install
```

If npm reports an install-script approval warning, do not blindly approve packages. The current project can be installed without enabling `electron-winstaller` install scripts:

```bash
npm install-scripts deny electron-winstaller
npm install
```

## 4. Build/synchronize the web app

The build script downloads the current MatteSkolan web files from `OskarFisk/matte-skolan` into `web/`.

```bash
npm run sync:web
```

This includes the web application files and `rickroll.mp4` when it exists in the source repository.

## 5. Desktop application

Start the desktop application during development:

```bash
npm start
```

Build desktop packages:

```bash
npm run build:desktop
```

Electron Builder is configured for Windows, Linux and macOS.

## 6. Prepare Android

Build/synchronize the Capacitor Android project:

```bash
npm run build:android
```

If Capacitor says TypeScript is missing:

```bash
npm install -D typescript
npm run build:android
```

If `android/` already exists, you can sync it with:

```bash
npx cap sync android
```

## 7. Java version

Use **Java 21** for the Android Gradle build. Java 25 can cause errors such as `Unsupported class file major version 69` with the Gradle/Groovy toolchain used by this project.

Check Java:

```bash
java -version
```

The output should show version 21.

## 8. Android SDK in Codespaces

If Gradle reports `SDK location not found`, install the Android command-line tools and set the SDK environment variables.

```bash
mkdir -p "$HOME/Android/Sdk/cmdline-tools"
```

Install Google's Android command-line tools into:

```text
$HOME/Android/Sdk/cmdline-tools/latest/
```

Then set:

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export ANDROID_SDK_ROOT="$ANDROID_HOME"
export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools:$PATH"
```

Install the required SDK components:

```bash
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0"
```

Accept the Android SDK licenses when prompted.

## 9. Tell Gradle where the SDK is

From the `android/` directory:

```bash
echo "sdk.dir=$HOME/Android/Sdk" > local.properties
```

`local.properties` is machine-specific and normally should not be committed.

## 10. Build the debug APK

```bash
cd android
./gradlew assembleDebug --no-daemon
```

A successful build ends with:

```text
BUILD SUCCESSFUL
```

The APK is normally here:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

From the repository root, the same path is:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 11. Check that the APK exists

From `android/`:

```bash
ls -lh app/build/outputs/apk/debug/app-debug.apk
```

Or from the repository root:

```bash
ls -lh android/app/build/outputs/apk/debug/app-debug.apk
```

## 12. Get the APK from Codespaces

In the VS Code/Codespaces file explorer, open:

`android/app/build/outputs/apk/debug/`

Download `app-debug.apk` to your computer/Chromebook.

You can also copy it to the repository root for easier access, but do not commit large build artifacts unless the project maintainers explicitly want that:

```bash
cp android/app/build/outputs/apk/debug/app-debug.apk MatteSkolan.apk
```

## 13. Install on Android

Transfer the APK to an Android device and open it. Android may require permission to install apps from the source you used to open the APK.

This is a debug APK. A public production release should use a properly protected release signing key instead of the debug signing configuration.

## 14. GitHub Actions

The repository also contains `.github/workflows/build.yml`. It is intended to build desktop packages and an Android debug APK automatically.

If Actions fails, reproduce the build in Codespaces first. The most useful checks are:

```bash
node --version
java -version
echo "$ANDROID_HOME"
ls -lh android/app/build/outputs/apk/debug/app-debug.apk
```

## 15. Common errors

### `Could not find installation of TypeScript`

```bash
npm install -D typescript
npm run build:android
```

### `Unsupported class file major version 69`

Use Java 21 rather than Java 25 and run the Gradle build again.

### `SDK location not found`

Set `ANDROID_HOME`, install the required SDK packages, and create `android/local.properties` with the correct `sdk.dir`.

### `android/` already exists

Do not run `npx cap add android` again. Use:

```bash
npx cap sync android
```

## Project structure

```text
matte-skolan-app/
├── .github/workflows/build.yml
├── android/                 # generated Capacitor Android project
├── electron/main.cjs        # desktop shell
├── scripts/sync-web.cjs     # downloads current web app
├── web/                     # synchronized web app
├── capacitor.config.ts
├── package.json
└── docs/                    # build documentation
```

## Important

The app wrapper is designed to pull the current public web project at build time. If the source repository changes, rebuild the app to include those changes.
