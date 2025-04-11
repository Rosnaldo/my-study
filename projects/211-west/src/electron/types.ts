export interface GetterSetter<T> {
  get: () => T | null;
  set: (value: T | null) => void;
}
