# MatteSkolan App

A desktop and Android app packaging project for MatteSkolan.

## Outputs

The GitHub Actions workflow builds three desktop packages independently:

- Windows: NSIS installer + portable build
- Linux: AppImage + Debian package
- macOS: DMG

It also builds a separate Android debug APK named `MatteSkolan-debug.apk`.

Each build bundles the current contents of the public `OskarFisk/matte-skolan` project at build time, including its procedural math engine, school UI, games, drawing workspace, AI tutor and `rickroll.mp4` when that file exists in the source repository.

## Local development

Requires Node.js 24+.

```bash
npm install
npm start
```

## Local desktop package

```bash
npm run build:desktop
```

## Local Android project/APK

```bash
npm run build:android
cd android
./gradlew assembleDebug
```

The GitHub Actions build is the easiest way to obtain platform-specific release artifacts without installing the native toolchains locally.

## Architecture

`electron/` contains the desktop shell.

`capacitor.config.ts` configures the Android package as `com.matteskolan.app`.

`scripts/sync-web.cjs` keeps the app bundle synchronized with the main MatteSkolan repository at build time.

`web/` is a small bootstrap directory that is replaced with the synchronized MatteSkolan web app during a build.
