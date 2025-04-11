import path from 'path';
import fs from 'fs';
import http from 'http';
import ProgressBar from 'electron-progressbar';
import { BrowserWindow } from 'electron';
import { download } from 'electron-dl';

type Manifest = { [path: string]: string };

const MANIFEST_TYPE = 'companion';
const MANIFEST_URL = `http://orbitreelstore.s3.amazonaws.com/bundles/211-west/manifest-${MANIFEST_TYPE}.json`;

class DownloadQueue {
  private queue: string[];
  private maxConcurrentCount: number;

  public onAssetDownloaded: (assetPath: string) => void;

  constructor(items: string[], maxConcurrentCount: number) {
    this.queue = items;
    this.maxConcurrentCount = maxConcurrentCount;
    this.onAssetDownloaded = () => {};
  }

  private download = async (
    assetPath: string,
    bundlePath: string
  ): Promise<void> => {
    const fileUrl = `http://orbitreelstore.s3.amazonaws.com/${assetPath}`;
    const bundleAssetPath = path.join(bundlePath, assetPath);

    fs.mkdir(path.join(bundleAssetPath, '..'), { recursive: true }, () => {
      const file = fs.createWriteStream(bundleAssetPath);

      http.get(fileUrl, (response) => {
        response.pipe(file);

        file.on('finish', () => {
          file.close(() => {
            this.onAssetDownloaded(assetPath);

            if (this.queue.length > 0) {
              this.download(this.queue.shift() as string, bundlePath);
            }
          });
        });
      });
    });
  };

  public start = async (bundlePath: string) => {
    for (
      let i = 0;
      i < Math.min(this.queue.length, this.maxConcurrentCount);
      i += 1
    ) {
      await this.download(this.queue.shift() as string, bundlePath);
    }
  };
}

function exists(path: string): Promise<boolean> {
  return new Promise((resolve) => {
    fs.access(path, (err) => {
      resolve(!err);
    });
  });
}

function fetchLocalManifest(manifestPath: string): Promise<Manifest> {
  return new Promise(async (resolve) => {
    if (!(await exists(manifestPath))) {
      resolve({});
    } else {
      fs.readFile(manifestPath, { encoding: 'utf-8' }, (_, data) => {
        resolve(JSON.parse(data));
      });
    }
  });
}

async function updateManifestLock(
  manifestPath: string,
  manifest: Manifest
): Promise<void> {
  const content = JSON.stringify(manifest);
  fs.writeFileSync(manifestPath, content);
}

export async function updateAssetsInBackground(
  browserWindow: BrowserWindow,
  userPath: string
): Promise<void> {
  const bundlePath = path.join(userPath, 'bundle');
  const manifestLockPath = path.join(
    bundlePath,
    'manifest-companion-lock.json'
  );
  const manifestPath = path.join(bundlePath, 'manifest-companion.json');

  const manifest = await fetchLocalManifest(manifestPath);
  const manifestLock = await fetchLocalManifest(manifestLockPath);

  const assetsRequiringUpdate: string[] = [];

  Object.keys(manifest).forEach((key) => {
    const assetPath = key;
    const sum = manifest[key];

    if (manifestLock[assetPath] !== sum) {
      assetsRequiringUpdate.push(assetPath);
    }
  });

  const updateNeeded = assetsRequiringUpdate.length > 0;
  const totalAssetsNeedingUpdate = assetsRequiringUpdate.length;

  if (updateNeeded) {
    return new Promise(async (resolve) => {
      const progressBar = new ProgressBar({
        indeterminate: false,
        text: 'Asset Update',
        detail: `Installed 0 out of ${assetsRequiringUpdate.length}...`,
        initialValue: 0,
        maxValue: totalAssetsNeedingUpdate
      });

      progressBar
        .on('completed', () => {
          progressBar.detail = 'Update completed. Exiting...';
          updateManifestLock(manifestLockPath, manifestLock);
          resolve();
        })
        .on('progress', () => {
          progressBar.detail = `Installed ${progressBar.value} out of ${totalAssetsNeedingUpdate}`;
          updateManifestLock(manifestLockPath, manifestLock);
        });

      const downloadQueue = new DownloadQueue(assetsRequiringUpdate, 20);
      downloadQueue.onAssetDownloaded = (assetPath) => {
        manifestLock[assetPath] = manifest[assetPath];
        progressBar.value += 1;
      };

      await downloadQueue.start(bundlePath);
    });
  }
}
