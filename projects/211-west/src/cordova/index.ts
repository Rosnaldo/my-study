import { env } from '../helpers/env';
import { updateScreenOrientationStore } from '../hooks/useScreenOrientation';
import { setOrientation } from './orientation';

export async function initCordova(): Promise<void> {
  return new Promise((resolve) => {
    async function onDeviceReady() {
      await setOrientation('landscape');

      updateScreenOrientationStore({
        orientation: 'landscape',
        isLocked: true
      });

      StatusBar.hide();
      resolve();
    }

    if (env.IS_IPAD) {
      document.addEventListener('deviceready', onDeviceReady, false);
    } else {
      resolve();
    }
  });
}
