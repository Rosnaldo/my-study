import * as cordovaFs from '../cordova/fs';
import { MediasManifest } from '../hooks/useContentLoad';
import { env } from './env';
import * as storage from './storage';

// DOWNLOAD

interface IDownloadOptions {
  fileUrl: string;
  relativePath: string;
  onProgress?: (percentage: number) => void;
}

export async function downloadMedia(options: IDownloadOptions) {
  if (env.IS_COMPANION) {
    return downloadMediaForCompanion(options);
  } else if (env.IS_IPAD) {
    return downloadMediaForIpad(options);
  }
}

async function downloadMediaForCompanion(options: IDownloadOptions) {
  return window.electronAPI.download(options);
}

async function downloadMediaForIpad(options: IDownloadOptions) {
  try {
    await cordovaFs.downloadFile(
      options.relativePath,
      options.fileUrl,
      options.onProgress
    );
  } catch (err) {
    console.error(`ERROR DOWNLOADING FROM URL ${options.fileUrl}: ${err}`);

    throw err;
  }
}

// LOAD MANIFEST

export async function loadManifest(): Promise<MediasManifest> {
  if (env.IS_COMPANION) {
    return JSON.parse(await getManifestForCompanion());
  } else if (env.IS_IPAD) {
    return JSON.parse(await getManifestForIpad());
  }
  return JSON.parse(await getManifestForWeb());
}

async function getManifestForCompanion(): Promise<string> {
  try {
    const manifestData = await fetch(
      new URL('manifest.json', env.DATA_PATH).href
    ).then((res) => res.text());

    return manifestData || '{}';
  } catch {
    return '{}';
  }
}

async function getManifestForIpad(): Promise<string> {
  try {
    const manifest = await cordovaFs.readFile('manifest.json');
    return manifest || '{}';
  } catch {
    return '{}';
  }
}

async function getManifestForWeb(): Promise<string> {
  return storage.getItem('content::manifest') || '{}';
}

// UPDATE MANIFEST

export async function updateManifest(manifest: MediasManifest): Promise<void> {
  const manifestString = JSON.stringify(manifest);

  if (env.IS_COMPANION) {
    await updateManifestForCompanion(manifestString);
  } else if (env.IS_IPAD) {
    await updateManifestForIpad(manifestString);
  } else {
    await updateManifestForWeb(manifestString);
  }
}

async function updateManifestForCompanion(manifest: string): Promise<void> {
  return window.electronAPI.writeFile({
    filePath: new URL('manifest.json', env.DATA_PATH).href,
    content: manifest
  });
}

async function updateManifestForIpad(manifest: string): Promise<void> {
  return cordovaFs.writeFile('manifest.json', manifest);
}

async function updateManifestForWeb(manifest: string): Promise<void> {
  storage.setItem('content::manifest', manifest);
}
