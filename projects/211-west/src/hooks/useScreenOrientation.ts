import { useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';
import * as cordovaOrientation from '../cordova/orientation';
import { env } from '../helpers/env';

// TYPE DEFINITIONS

export type Orientation = 'portrait' | 'landscape';

export interface IScreenOrientationStore {
  orientation: Orientation;
  isLocked: boolean;
}

export const screenOrientationStore = proxy<IScreenOrientationStore>({
  orientation: 'landscape',
  isLocked: false
});

// STORE UPDATE FUNCTIONS

export function updateScreenOrientationStore(data: IScreenOrientationStore) {
  screenOrientationStore.orientation = data.orientation;
  screenOrientationStore.isLocked = data.isLocked;
}

export async function setOrientation(orientation: Orientation) {
  if (env.IS_IPAD) {
    await cordovaOrientation.setOrientation(orientation);
  }

  screenOrientationStore.orientation = orientation;
  screenOrientationStore.isLocked = true;
}

export function unlockOrientation() {
  screenOrientationStore.isLocked = false;
  if (env.IS_IPAD) {
    cordovaOrientation.unlockOrientation();
  }
}

// HOOK

export function useScreenOrientation() {
  const storeSnapshot = useSnapshot(screenOrientationStore);

  // MEMOIZE STORE AND FUNCTIONS INTO A CONTEXT
  const context = useMemo(
    () => [
      storeSnapshot,
      {
        setOrientation,
        unlockOrientation
      }
    ],
    [storeSnapshot]
  );

  return context as [
    IScreenOrientationStore,
    {
      setOrientation: typeof setOrientation;
      unlockOrientation: typeof unlockOrientation;
    }
  ];
}
