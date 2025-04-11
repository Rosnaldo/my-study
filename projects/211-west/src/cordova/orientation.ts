import { Orientation } from '../hooks/useScreenOrientation';

export async function setOrientation(orientation: Orientation) {
  try {
    await window.screen.orientation.lock(orientation);
  } catch (err) {
    console.error(
      `ERROR: Could not lock screen orientation.`,
      (err as Error).message
    );
  }
}

export function unlockOrientation() {
  window.screen.orientation.unlock();
}
