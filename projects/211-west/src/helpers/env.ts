import { matchPath } from 'react-router';
import * as cordovaFs from '../cordova/fs';
import { checkCustomerRouting } from './routing';
const getIsCordova = () => !!window.cordova;
const getIsElectron = () => !!(window as any).IS_ELECTRON;
const getIsCompainion = () => !!window.IS_COMPANION;
const getIsWeb = () =>
  !getIsCordova() && !getIsElectron() && !getIsCompainion();

class EnvironmentVariables {
  public DEBUG = process.env.DEBUG === 'true';
  public DATA_PATH = '';
  public COUNTRIES_LIST_URL = process.env.COUNTRIES_LIST_URL || '';
  public APPLICATION_ID = process.env.APPLICATION_ID || '';
  public PROPERTY_ID = process.env.PROPERTY_ID || '';
  public ANALYTICS_API_URL = process.env.ANALYTICS_API_URL || '';
  public CUSTOMER_TOKEN = process.env.CUSTOMER_TOKEN || '';
  public SAGE_API_URL = process.env.SAGE_API_URL || '';
  public MEDIA_GRAPHQL_API = process.env.MEDIA_GRAPHQL_API || '';
  public MEDIA_GRAPHQL_API_KEY = process.env.MEDIA_GRAPHQL_API_KEY || '';
  public MEDIA_DOMAIN = process.env.MEDIA_DOMAIN || '';
  public COMPANION_TOKEN = process.env.COMPANION_TOKEN || '';
  public EXTERNAL_ORBIT_REEL_ASSET_STORE_URL =
    'https://orbitreelstore.s3.amazonaws.com';
  public ORBIT_REEL_ASSET_STORE_URL = this.EXTERNAL_ORBIT_REEL_ASSET_STORE_URL;

  public IPAD_IMAGE_WIDTH = 1024;
  public THUMBNAIL_IMAGE_WIDTH = 512;
  public APP_VERSION = process.env.APP_VERSION || '';

  get IS_IFRAME() {
    return !!matchPath(`/iframe`, window.location.pathname);
  }

  get IS_COMPANION() {
    return !!window.IS_COMPANION;
  }

  get IS_IPAD() {
    return !!window.IS_IPAD;
  }

  get IS_WEB() {
    return getIsWeb();
  }

  get NEMA_URL() {
    return window.location.origin || '';
  }

  get IS_COSTUMER_VIEW() {
    return checkCustomerRouting().isCustomer;
  }
}

export const env = new EnvironmentVariables();

export const initEnvironmentVariables = async () => {
  env.DATA_PATH = `https://${env.MEDIA_DOMAIN}`;

  if (env.IS_COMPANION) {
    const dataPath = sanitizePath(await window.electronAPI.getDataPath());
    env.DATA_PATH = `file://${dataPath}/Documents/`;
    env.ORBIT_REEL_ASSET_STORE_URL = `file://${dataPath}/bundle`;

    return;
  }

  if (env.IS_IPAD) {
    const dataPath = window.cordova.file.dataDirectory;
    const appPath = window.cordova.file.applicationDirectory;
    env.DATA_PATH = `${dataPath}`;
    env.ORBIT_REEL_ASSET_STORE_URL = cordovaFs.convertFileUrl(
      `${appPath}www/static/media/bundle`
    );

    return;
  }

  env.DATA_PATH = `https://${env.MEDIA_DOMAIN}`;
};

const sanitizePath = (path: string): string =>
  path.replaceAll('#', encodeURIComponent('#'));
