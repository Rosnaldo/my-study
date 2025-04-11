import { proxy } from 'valtio';
import * as storage from '../../helpers/storage';

type Cache = Record<string, unknown>;

function getStoredCache() {
  const values: Cache = {};

  for (const key in storage.getItems()) {
    const item = storage.getItem(key);

    try {
      values[key] = JSON.parse(item || 'null');
    } catch {
      values[key] = item;
    }
  }

  return values;
}

export const cacheStore = proxy<Cache>(getStoredCache());
