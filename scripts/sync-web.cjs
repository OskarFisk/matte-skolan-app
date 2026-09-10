const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');

const ROOT = path.resolve(__dirname, '..');
const WEB_DIR = path.join(ROOT, 'web');
const REPO = 'https://raw.githubusercontent.com/OskarFisk/matte-skolan/main/';

const FILES = [
  'index.html',
  'app.js',
  'style.css',
  'enhancements.css',
  'enhancements.js',
  'tutor-drawing.css',
  'tutor-drawing.js',
  'rickroll.mp4'
];

function download(url, destination) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, { headers: { 'User-Agent': 'MatteSkolan-App-Build/1.0' } }, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        return download(response.headers.location, destination).then(resolve, reject);
      }
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`Download failed (${response.statusCode}): ${url}`));
        return;
      }
      const output = fs.createWriteStream(destination);
      response.pipe(output);
      output.on('finish', () => output.close(resolve));
      output.on('error', reject);
    });
    request.on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(WEB_DIR, { recursive: true });
  for (const file of FILES) {
    const destination = path.join(WEB_DIR, file);
    try {
      await download(REPO + file, destination);
      console.log(`synced ${file}`);
    } catch (error) {
      if (fs.existsSync(destination)) {
        console.warn(`keeping existing ${file}: ${error.message}`);
      } else if (file === 'rickroll.mp4') {
        console.warn('rickroll.mp4 is optional; continuing without it.');
      } else {
        throw error;
      }
    }
  }
}

main().catch(error => {
  console.error(error.message);
  process.exit(1);
});
