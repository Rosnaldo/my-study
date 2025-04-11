/// <reference types="react-scripts" />
/// <reference types="cordova" />
/// <reference types="cordova-plugin-file" />
/// <reference types="cordova-plugin-background-download" />
/// <reference types="cordova-plugin-statusbar" />

declare module '*.ttf';

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    '4k': true;
    '1080p': true;
  }
}

import type { ElectronApi } from './electron/preload';

declare global {
  interface Window {
    electronAPI: ElectronApi;

    IS_COMPANION?: boolean;
    IS_IPAD?: boolean;
  }

  namespace BackgroundTransfer {
    class BackgroundDownloader {
      constructor(uriMatcher?: string);

      createDownload(
        uri: string,
        resultFile: FileEntry,
        notificationTitle?: string
      ): DownloadOperation;
    }

    class DownloadOperation {
      constructor(
        uri: string,
        resultFile: FileEntry,
        uriMatcher?: string,
        notificationTitle?: string
      );

      startAsync(): DownloadPromise;
      stop(): void;
    }

    interface DownloadPromise {
      then(
        onComplete: () => void,
        onError: (err: Error) => void,
        onProgress: (progress: {
          bytesReceived: number;
          totalBytesToReceive: number;
        }) => void
      ): DownloadPromise;
    }
  }
}
