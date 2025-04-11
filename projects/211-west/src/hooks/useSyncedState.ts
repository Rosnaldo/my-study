import isEqual from 'lodash/isEqual';
import { SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
import { env } from '../helpers/env';
import { useCompanion } from './useCompanion';

export function useSyncedState<T>(
  name: string,
  initialValue: T
): [T, (value: SetStateAction<T>) => void] {
  const [{ isConnected }, { on, send }] = useCompanion();
  const [value, setValue] = useState<T>(initialValue);
  const isTransmitterAndConnected = !env.IS_COMPANION && isConnected;
  useEffect(() => {
    if (isTransmitterAndConnected) {
      send(`synced-state:${name}`, { value });
    }
  }, [value, isConnected]);

  useLayoutEffect(() => {
    if (env.IS_COMPANION) {
      const unsubscribe = on(
        `synced-state:${name}`,
        (_, data: { value: T }) => {
          setValue((value) => {
            if (isEqual(value, data.value)) {
              return value;
            }
            return data.value;
          });
        }
      );
      return unsubscribe;
    }
  }, []);

  return [value, setValue];
}
