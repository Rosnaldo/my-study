import { subscribeKey } from 'valtio/utils';

interface IPersistStore {
  version: number;
  status: 'loading' | 'loaded' | 'error';
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export function onPersistStoreReady(store: {
  _persist: IPersistStore;
}): Promise<void> {
  return new Promise((resolve) => {
    if (store._persist.loaded) {
      return resolve();
    }

    subscribeKey(store._persist, 'loaded', (loaded) => {
      if (loaded) {
        resolve();
      }
    });
  });
}
