import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.matteskolan.app',
  appName: 'MatteSkolan',
  webDir: 'web',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
