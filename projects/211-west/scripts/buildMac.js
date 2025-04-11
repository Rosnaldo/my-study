const { execSync } = require('child_process');

const stage = process.env.STAGE;

if (!stage) {
  throw new Error('Missing STAGE var!');
}

const configFile =
  stage === 'production'
    ? 'config/electron-builder-prod.yml'
    : 'config/electron-builder-dev.yml';

execSync(`./node_modules/.bin/electron-builder --mac --config=${configFile}`, {
  encoding: 'utf8'
});
