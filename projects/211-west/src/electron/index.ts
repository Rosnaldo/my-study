// This is main process of Electron, started as first thing when your
// app starts. It runs through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, BrowserWindow, powerSaveBlocker } from 'electron';
import { Server } from 'http';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from 'env';
import path from 'path';
import url from 'url';

import { watch } from 'fs';
import { initIpc } from './ipc';
import { initServer } from './server';
import { GetterSetter } from './types';
import { createWindow } from './window';
import { updateAssetsInBackground } from '~/electron/orbitReelBundle';
import { sendLog } from './log';

let mainWindow: BrowserWindow | null = null;
let server: Server | null = null;
let powerSaveBlockerId: number | null = null;

const serverGetterSetter: GetterSetter<Server> = {
  get: () => server,
  set: (newServer) => (server = newServer)
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
const IS_PROD = env.name === 'production';
if (!IS_PROD) {
  const userDataPath = app.getPath('userData');
  app.setPath('userData', `${userDataPath} (${env.name})`);
}

app.on('ready', async () => {
  app.commandLine.appendSwitch('force_high_performance_gpu');

  powerSaveBlockerId = powerSaveBlocker.start('prevent-display-sleep');
  initIpc(() => mainWindow, serverGetterSetter);
  server = initServer(() => mainWindow);

  mainWindow = createWindow('about:blank', {
    show: false,
    ...(IS_PROD ? { width: 3840, height: 980 } : {})
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (!IS_PROD) {
    mainWindow.webContents.openDevTools();
  }

  await updateAssetsInBackground(mainWindow, app.getPath('userData'));

  mainWindow.webContents.once('did-finish-load', () => mainWindow?.show());
  mainWindow.loadURL(
    new url.URL(`file://${path.join(__dirname, 'app.html')}`).href
  );
});

app.on('window-all-closed', () => {
  app.quit();

  server?.close();

  if (powerSaveBlockerId !== null) {
    powerSaveBlocker.stop(powerSaveBlockerId);
  }
});

app.whenReady().then(() => {
  watch(path.join(__dirname, '..', 'src'), () => {
    mainWindow?.reload();
  });
});

process.on('uncaughtException', (error) => {
  if (mainWindow) {
    sendLog(mainWindow, `[ERROR - Uncaught Exception] ${error}`);
  }
});
