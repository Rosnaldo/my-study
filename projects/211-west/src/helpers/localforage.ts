import localforage from 'localforage';

export interface ProxyPersistStorageEngine {
  getItem: (name: string) => string | null | Promise<string | null>;
  setItem: (name: string, value: string) => void | Promise<void>;
  removeItem: (name: string) => void | Promise<void>;
  getAllKeys: () => string[] | Promise<string[]>;
}

export const localForageStorage: ProxyPersistStorageEngine = {
  async getItem(name: string): Promise<string | null> {
    return localforage.getItem(name);
  },
  async setItem(name: string, value: string): Promise<void> {
    await localforage.setItem(name, value);
  },
  async removeItem(name: string): Promise<void> {
    await localforage.removeItem(name);
  },
  async getAllKeys(): Promise<string[]> {
    return localforage.keys();
  }
};
