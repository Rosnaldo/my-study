const storage =
  globalThis.window?.localStorage || globalThis.window?.sessionStorage || {};

export function getItem(key: string): string | null {
  if ('getItem' in storage && storage.getItem instanceof Function) {
    return storage.getItem(key);
  }
  return storage[key];
}

export function setItem(key: string, value: string): void {
  if ('setItem' in storage && storage.setItem instanceof Function) {
    storage.setItem(key, value);
  }
  storage[key];
}

export function removeItem(key: string): void {
  if ('removeItem' in storage && storage.removeItem instanceof Function) {
    storage.removeItem(key);
  }
  delete storage[key];
}

export function getItems(): Record<string, string> {
  return {
    ...(globalThis.window?.localStorage ||
      globalThis.window?.sessionStorage ||
      storage)
  };
}

export function getAllKeys(): string[] {
  return Object.keys(getItems());
}
