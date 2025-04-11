import { Dispatch, SetStateAction, useCallback } from 'react';
import { snapshot, useSnapshot } from 'valtio';
import * as storage from '../../helpers/storage';
import { cacheStore } from './store';

export function useCache<T>(key: string) {
  const cacheSnapshot = useSnapshot(cacheStore);

  const value = cacheSnapshot[key] || null;

  const setValue = useCallback((update: SetStateAction<T | null>) => {
    const newValue =
      update instanceof Function
        ? update(snapshot(cacheStore)[key] as T)
        : update;

    if (newValue === null || newValue === undefined) {
      delete cacheStore[key];
      storage.removeItem(key);
    } else {
      cacheStore[key] = newValue;
      storage.setItem(key, JSON.stringify(newValue));
    }
  }, []);

  return [value, setValue] as [T | null, Dispatch<SetStateAction<T | null>>];
}

export const getCacheSnapshot = () => snapshot(cacheStore);
