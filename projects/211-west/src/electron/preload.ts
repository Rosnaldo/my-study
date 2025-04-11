import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Unsubscriber = () => void;

type ElectronIpcEventCallback<T = unknown> = (
  event: IpcRendererEvent,
  value: T
) => void;

type ElectronIpcEventCaller<TPayload = unknown, TResult = void> = (
  payload?: TPayload
) => Promise<TResult>;

export interface ElectronApi {
  onMessage: <T>(
    callback: ElectronIpcEventCallback<{ type: string; payload: T }>
  ) => Unsubscriber;

  onLog: (callback: ElectronIpcEventCallback<string>) => Unsubscriber;

  getDataPath: ElectronIpcEventCaller<void, string>;

  writeFile: ElectronIpcEventCaller<{ filePath: string; content: string }>;
  deleteFile: ElectronIpcEventCaller<{ filePath: string }>;
  moveDir: ElectronIpcEventCaller<{ srcDirPath: string; destDirPath: string }>;

  download: ElectronIpcEventCaller<{
    basePath?: string;
    fileUrl: string;
    onProgress?: (size: number) => void;
  }>;

  minimizeApp: ElectronIpcEventCaller<{}>;
  showMaximizeApplication: ElectronIpcEventCaller<{}>;

  rebootServer: ElectronIpcEventCaller<{}>;
  rebootApp: ElectronIpcEventCaller<{}>;

  log: ElectronIpcEventCaller<{ message: string }>;

  messageUDP: ElectronIpcEventCaller<{
    message: string;
    ip: string;
    port: string;
  }>;
}

contextBridge.exposeInMainWorld('electronAPI', {
  onMessage: (callback) => {
    ipcRenderer.on('api::message', callback);
    return () => ipcRenderer.off('api::message', callback);
  },

  onLog: (callback) => {
    ipcRenderer.on('debug::log', callback);
    return () => ipcRenderer.off('debug::log', callback);
  },

  getDataPath: () => {
    return ipcRenderer.invoke('file::get-data-path');
  },

  writeFile: (data) => {
    return ipcRenderer.invoke('file::write', data);
  },

  deleteFile: (data) => {
    return ipcRenderer.invoke('file::delete', data);
  },

  moveDir: (data) => {
    return ipcRenderer.invoke('dir::move', data);
  },

  download: (options) => {
    const { onProgress, ...data } = options || {};
    const onDownloadProgress = (_ev, percentage: number) =>
      onProgress?.(percentage);

    ipcRenderer.on('file::download-progress', onDownloadProgress);
    ipcRenderer.once('file::download-end', () =>
      ipcRenderer.off('file::download-progress', onDownloadProgress)
    );

    return ipcRenderer.invoke('file::download', data);
  },

  showWindow: (data) => {
    return ipcRenderer.invoke('window::show', data);
  },
  setForegroundWindow: (data) => {
    return ipcRenderer.invoke('window::set-foreground', data);
  },
  switchToThisWindow: (data) => {
    return ipcRenderer.invoke('window::switch', data);
  },
  minimizeApp: (data) => {
    return ipcRenderer.invoke('app-window::minimize', data);
  },
  showMaximizeApplication: (data) => {
    return ipcRenderer.invoke('app-window::show-maximize', data);
  },
  messageUDP: (data) => {
    return ipcRenderer.invoke('messaging::udp', data);
  },
  rebootServer: (data) => {
    return ipcRenderer.invoke('server::reboot', data);
  },
  rebootApp: (data) => {
    return ipcRenderer.invoke('app::reboot', data);
  },

  log: (data) => {
    return ipcRenderer.invoke('app::log', data);
  }
} as ElectronApi);
