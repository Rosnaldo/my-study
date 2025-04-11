import { app, BrowserWindow } from 'electron';
import fetch from 'electron-fetch';
import fs from 'fs';
import path from 'path';

let autoSyncLogTimeout: NodeJS.Timeout | null = null;

function getCurrentDate() {
  return new Date(new Date().toUTCString()).toISOString();
}

export function createLogFile() {
  // const [filename] = getCurrentDate().split('T');
  const filename = 'latest';

  const logsPath = path.join(app.getPath('userData'), `EV-Logs`);
  const logFilePath = path.join(logsPath, `${filename}.txt`);

  fs.mkdirSync(logsPath, { recursive: true });

  try {
    if (fs.existsSync(logFilePath)) {
      fs.rmSync(logFilePath);
    }
  } catch (err) {
    console.error(err);
  }

  return logFilePath;
}

export async function appendLog(logFilePath: string, content: string) {
  const log = `\n[${getCurrentDate()}] - ${content}`;

  await fs.promises.appendFile(logFilePath, log, { encoding: 'utf8' });
  autoSyncLog(logFilePath);
}

export async function syncLog(logFilePath: string) {
  // disabled
  // const filename = path.basename(logFilePath);
  // const body = await fs.promises.readFile(logFilePath, { encoding: 'utf8' });
  // try {
  //   await fetch(
  //     `https://vysta-devops.s3.amazonaws.com/logs/${process.env.APPLICATION_ID}/${filename}`,
  //     { method: 'PUT', body }
  //   );
  // } catch (err) {
  //   console.error(err);
  // }
}

function autoSyncLog(logFilePath: string) {
  if (autoSyncLogTimeout !== null) {
    clearTimeout(autoSyncLogTimeout);
  }

  autoSyncLogTimeout = setTimeout(() => {
    syncLog(logFilePath);
  }, 60_000);
}

export function sendLog(window: BrowserWindow, log: string) {
  window.webContents.send('debug::log', log);
}
