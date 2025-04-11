import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron';
import path from 'path';

const DEFAULT_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
  width: 1024,
  height: 768,
  autoHideMenuBar: true,
  fullscreen: true,
  frame: false,
  backgroundColor: '#6C6343',
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
};

export function createWindow(
  url: string,
  options: BrowserWindowConstructorOptions = {}
) {
  const window = new BrowserWindow(
    Object.assign(DEFAULT_WINDOW_OPTIONS, options)
  );
  window.loadURL(url);
  return window;
}
