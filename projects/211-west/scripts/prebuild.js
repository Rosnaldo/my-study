const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');
const { config } = require('dotenv');
const assetBundler = require('./bundleAssets');

function renameOutputFolder(buildFolderPath, outputFolderPath) {
  return new Promise((resolve, reject) => {
    fs.rename(buildFolderPath, outputFolderPath, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Successfully built!');
      }
    });
  });
}

function execPostReactBuild(buildFolderPath, outputFolderPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(buildFolderPath)) {
      if (fs.existsSync(outputFolderPath)) {
        rimraf(outputFolderPath, (err) => {
          if (err) {
            reject(err);
            return;
          }
          renameOutputFolder(buildFolderPath, outputFolderPath)
            .then((val) => resolve(val))
            .catch((e) => reject(e));
        });
      } else {
        renameOutputFolder(buildFolderPath, outputFolderPath)
          .then((val) => resolve(val))
          .catch((e) => reject(e));
      }
    } else {
      reject(new Error('build folder does not exist'));
    }
  });
}

module.exports = () => {
  const projectPath = path.resolve(process.cwd(), './node_modules/.bin/craco');

  config({ path: path.resolve(process.cwd(), '.env.local') });

  return new Promise((resolve, reject) => {
    exec(`${projectPath} build`, (error, stdout, stderr) => {
      console.log('[STDOUT] -', stdout);
      console.error('[STDERR] -', stderr);
      if (error) {
        console.error('[ERROR] -', error);
        reject(error);
        return;
      }
      execPostReactBuild(
        path.resolve(__dirname, '../build/'),
        path.join(__dirname, '../www/')
      )
        .then((s) => {
          assetBundler('ios').then(() => {
            resolve(s);
          });
        })
        .catch((e) => {
          console.error('[STDERR] -', e);
          reject(e);
        });
    });
  });
};
