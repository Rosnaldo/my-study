import { env } from '../helpers/env';

export function convertFileUrl(fileUrl: string): string {
  // This was not documented on the cordova docs.
  // That's the only function that works to get local files.
  return (window as any).WkWebView.convertFilePath(fileUrl);
}

export async function downloadFile(
  relativePath: string,
  fileUrl: string,
  onProgress?: (percent: number) => void
): Promise<void> {
  const paths = relativePath.split('/').filter((it) => it.trim());
  const fileName = paths.pop() as string;

  const rootDirEntry = await getDataRootDir();
  const dirEntry =
    paths.length > 0
      ? await getDir(rootDirEntry, paths.join('/'), true)
      : rootDirEntry;
  const fileEntry = await getFile(dirEntry, fileName, true);

  return new Promise((resolve, reject) => {
    const downloader = new BackgroundTransfer.BackgroundDownloader();
    const download = downloader.createDownload(fileUrl, fileEntry);
    download.startAsync().then(
      () => resolve(),
      (err) =>
        reject(
          new Error(
            `Unable to download file ${fileEntry.fullPath}. Error: ${err}`
          )
        ),
      (progress) =>
        onProgress?.(progress.bytesReceived / progress.totalBytesToReceive)
    );
  });
}

export async function writeFile(
  relativePath: string,
  content: string | Blob
): Promise<void> {
  const paths = relativePath.split('/').filter((it) => it.trim());
  const fileName = paths.pop() as string;

  const rootDirEntry = await getDataRootDir();
  const dirEntry =
    paths.length > 0
      ? await getDir(rootDirEntry, paths.join('/'), true)
      : rootDirEntry;
  const fileEntry = await getFile(dirEntry, fileName, true);

  return new Promise((resolve, reject) => {
    fileEntry.createWriter((fileWriter) => {
      fileWriter.onwriteend = () => {
        resolve();
      };
      fileWriter.onerror = () => {
        reject(new Error(`Unable to write file ${fileEntry.fullPath}`));
      };
      fileWriter.onabort = () => {
        reject(new Error(`ABORT: Unable to write file ${fileEntry.fullPath}`));
      };
      fileWriter.write(content);
    });
  });
}

export async function readFile(relativePath: string): Promise<string> {
  const paths = relativePath.split('/').filter((it) => it.trim());
  const fileName = paths.pop() as string;

  const rootDirEntry = await getDataRootDir();
  const dirEntry =
    paths.length > 0
      ? await getDir(rootDirEntry, paths.join('/'), true)
      : rootDirEntry;
  const fileEntry = await getFile(dirEntry, fileName, false);

  return new Promise((resolve, reject) => {
    fileEntry.file(
      (file) => {
        const reader = new FileReader();

        reader.onloadend = function () {
          resolve(this.result?.toString() || '');
        };
        reader.onerror = function () {
          reject(`Unable to read file ${relativePath}`);
        };

        reader.readAsText(file);
      },
      (err) =>
        reject(
          new Error(
            `Unable to get file ${fileEntry.fullPath} (code ${err.code})`
          )
        )
    );
  });
}

export async function readImage(relativePath: string): Promise<string> {
  const paths = relativePath.split('/').filter((it) => it.trim());
  const fileName = paths.pop() as string;

  const rootDirEntry = await getDataRootDir();
  const dirEntry =
    paths.length > 0
      ? await getDir(rootDirEntry, paths.join('/'), true)
      : rootDirEntry;
  const fileEntry = await getFile(dirEntry, fileName, false);

  return new Promise((resolve, reject) => {
    fileEntry.file(
      (file) => {
        const reader = new FileReader();

        reader.onloadend = function () {
          resolve(this.result?.toString() || '');
        };
        reader.onerror = function () {
          reject(`Unable to read image ${relativePath}`);
        };

        reader.readAsDataURL(file);
      },
      (err) =>
        reject(
          new Error(
            `Unable to get image ${fileEntry.fullPath} (code ${err.code})`
          )
        )
    );
  });
}

export async function moveDir(
  srcDirPath: string,
  destDirPath: string
): Promise<void> {
  const rootDirEntry = await getDataRootDir();
  const srcDirEntry = await getDir(rootDirEntry, srcDirPath, true);
  const destDirEntry = await getDir(rootDirEntry, destDirPath, true);

  return new Promise((resolve, reject) => {
    srcDirEntry.moveTo(
      destDirEntry,
      undefined,
      () => resolve(),
      (err) =>
        reject(
          new Error(
            `Unable to move directory ${srcDirEntry.fullPath} into ${destDirEntry.fullPath} (code ${err.code})`
          )
        )
    );
  });
}

export async function deleteFile(relativePath: string): Promise<void> {
  const paths = relativePath.split('/').filter((it) => it.trim());
  const fileName = paths.pop() as string;

  const rootDirEntry = await getDataRootDir();
  const dirEntry =
    paths.length > 0
      ? await getDir(rootDirEntry, paths.join('/'), true)
      : rootDirEntry;
  const fileEntry = await getFile(dirEntry, fileName, true);

  return new Promise((resolve, reject) => {
    fileEntry.remove(resolve, (err) =>
      reject(
        new Error(
          `Unable to delete file ${fileEntry.fullPath} (code ${err.code})`
        )
      )
    );
  });
}

async function getDataRootDir(): Promise<DirectoryEntry> {
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(
      env.DATA_PATH,
      (entry) => resolve(entry as DirectoryEntry),
      (err) =>
        reject(
          new Error(`Unable to get data root directory (code ${err.code})`)
        )
    );
  });
}

async function getDir(
  parentDirEntry: DirectoryEntry,
  relativeDirPath: string,
  create
): Promise<DirectoryEntry> {
  const paths = relativeDirPath.split('/').filter((it) => it.trim());
  let currentDirEntry = parentDirEntry;

  for (const path of paths) {
    currentDirEntry = await new Promise((resolve, reject) => {
      currentDirEntry.getDirectory(path, { create }, resolve, (err) =>
        reject(
          new Error(
            `Unable to get directory ${path} on ${relativeDirPath} (code ${err.code})`
          )
        )
      );
    });
  }

  return currentDirEntry;
}

async function getFile(
  dirEntry: DirectoryEntry,
  fileName: string,
  create
): Promise<FileEntry> {
  return new Promise((resolve, reject) => {
    dirEntry.getFile(fileName, { create }, resolve, (err) =>
      reject(
        new Error(
          `Unable to create file ${fileName} at ${dirEntry.fullPath} (code ${err.code})`
        )
      )
    );
  });
}
