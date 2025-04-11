const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');
const download = require('download');

const dotBundlePath = path.resolve(process.cwd(), './bundle');

const staticAssetsPath = path.resolve(process.cwd(), './www/static/media/');
const bundleExists = fs.existsSync(dotBundlePath);

async function fetchManifestLock(type) {
  const manifestLockPath = path.resolve(
    process.cwd(),
    dotBundlePath,
    `manifest-${type}-lock.json`
  );

  if (!fs.existsSync(manifestLockPath)) {
    return {};
  } else {
    return JSON.parse(fs.readFileSync(manifestLockPath, { encoding: 'utf-8' }));
  }
}

async function fetchManifest(type) {
  const manifestPath = path.resolve(
    process.cwd(),
    dotBundlePath,
    `manifest-${type}.json`
  );

  fs.writeFileSync(
    manifestPath,
    await download(
      `http://orbitreelstore.s3.amazonaws.com/bundles/angeline/manifest-${type}.json`
    )
  );
  return JSON.parse(fs.readFileSync(manifestPath, { encoding: 'utf-8' }));
}

async function updateManifest(manifest, manifestLock) {
  let promises = [];

  Object.keys(manifest).forEach((key) => {
    const assetPath = key;
    const sum = manifest[key];

    if (manifestLock[assetPath] !== sum) {
      promises.push(
        new Promise(async (resolve) => {
          const downloadUrl = `http://orbitreelstore.s3.amazonaws.com/${assetPath}`;
          const bundleAssetPath = `${dotBundlePath}/${assetPath}`;

          fs.mkdirSync(
            bundleAssetPath.substring(0, bundleAssetPath.lastIndexOf('/')),
            { recursive: true }
          );

          fs.writeFile(bundleAssetPath, await download(downloadUrl), () => {
            manifestLock[assetPath] = sum;

            resolve();
          });
        })
      );
    }
  });

  await Promise.all(promises);
}

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  console.log(`COPY "${src}" -> "${dest}"`);
  if (isDirectory) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

function bundlePlatformAssets(type) {
  return async () => {
    if (!bundleExists) {
      fs.mkdirSync(dotBundlePath, { recursive: true });
    }

    // const manifest = await fetchManifest(type);
    // const manifestLock = await fetchManifestLock(type);

    // await updateManifest(manifest, manifestLock);

    // fs.writeFileSync(
    //   `${dotBundlePath}/manifest-${type}-lock.json`,
    //   JSON.stringify(manifestLock)
    // );

    // copyRecursiveSync(`${dotBundlePath}/`, `${staticAssetsPath}/bundle`);
  };
}

const bundleIOSAssets = bundlePlatformAssets('ios');
const bundleCompanionAssets = bundlePlatformAssets('companion');

module.exports = (type) => {
  return new Promise((resolve) => {
    if (type === 'ios') {
      bundleIOSAssets().then(resolve);
    } else if (type === 'companion') {
      bundleCompanionAssets().then(resolve);
    }
  });
};
