import { app, BrowserWindow, ipcMain, shell } from 'electron';
import { download } from 'electron-dl';
import path from 'path';
import fs from 'fs';
import { debug } from '../helpers/debug';
import { fileURLToPath } from 'url';
import { Server } from 'http';
import { initServer } from './server';
import { GetterSetter } from './types';

export function initIpc(
  mainWindowGetter: () => BrowserWindow | null,
  serverGetterSetter: GetterSetter<Server>
) {
  ipcMain.handle('file::get-data-path', () => {
    return app.getPath('userData');
  });

  ipcMain.on('api::message', (_event, data) => {
    debug('api::message', data);
  });

  ipcMain.on('debug::log', (_event, data) => {
    debug('debug::log', data);
  });

  ipcMain.handle(
    'file::write',
    async (_event, data: { filePath: string; content: string }) => {
      debug('file::write', data);

      const fileDir = path.dirname(
        decodeURIComponent(fileURLToPath(data.filePath))
      );

      if (!fs.existsSync(fileDir)) {
        fs.mkdirSync(fileDir, { recursive: true });
      }

      fs.writeFileSync(
        decodeURIComponent(fileURLToPath(data.filePath)),
        data.content,
        typeof data.content === 'string' ? { encoding: 'utf8' } : {}
      );
    }
  );

  ipcMain.handle('file::delete', async (_event, data: { filePath: string }) => {
    debug('file::delete', data);

    fs.rmSync(decodeURIComponent(fileURLToPath(data.filePath)));
  });

  ipcMain.handle(
    'dir::move',
    async (_event, data: { srcDirPath: string; destDirPath: string }) => {
      debug('dir::move', data);

      fs.renameSync(
        decodeURIComponent(fileURLToPath(data.srcDirPath)),
        decodeURIComponent(fileURLToPath(`${data.destDirPath}${path.sep}`))
      );
    }
  );

  ipcMain.handle(
    'file::download',
    async (_event, data: { basePath?: string; fileUrl: string }) => {
      debug('file::download', data);
      const mainWindow = mainWindowGetter();

      const [_filename, ...reverseFilePath] = new URL(data.fileUrl).pathname
        .split('/')
        .reverse();
      const filePath = reverseFilePath.reverse().join('/');
      const basePath = data.basePath
        ? data.basePath
        : path.join(app.getPath('userData'), 'Documents');

      if (mainWindow) {
        const { savePath } = await download(mainWindow, data.fileUrl, {
          directory: path.join(basePath, filePath),
          overwrite: true,
          saveAs: false,
          onProgress(progress) {
            mainWindow.webContents.send(
              'file::download-progress',
              progress.percent
            );
          },
          onCompleted() {
            mainWindow.webContents.send('file::download-end');
          }
        });

        return { savePath };
      }
    }
  );

  ipcMain.handle('app-window::minimize', (_event, _data) => {
    const mainWindow = mainWindowGetter();
    if (mainWindow) {
      mainWindow.minimize();
    }
  });

  ipcMain.handle('app-window::show-maximize', (_event, _data) => {
    const mainWindow = mainWindowGetter();
    if (mainWindow) {
      mainWindow.focus();
    }
  });

  ipcMain.handle('server::reboot', (_event, _data) => {
    const server = serverGetterSetter.get();

    if (server) {
      server.close();
    }

    serverGetterSetter.set(initServer(mainWindowGetter));
  });

  ipcMain.handle('app::reboot', (_event, _data) => {
    app.relaunch({ execPath: process.env.PORTABLE_EXECUTABLE_FILE });
    app.quit();
  });

  ipcMain.handle('app::log', (_event, data: { message: string }) => {
    console.log(`IPC (app::log) - ${data.message}`);
  });
}
