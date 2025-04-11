import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { IDevice } from '~/hooks/useDevices';
import * as storage from '~/helpers/storage';

export type DevicesState = {
  devices: IDevice[];
};

export type DevicesActions = {
  setDevices: (devices: IDevice[]) => void;
};

export const useDevicesStore = create(
  persist(
    immer<DevicesState & DevicesActions>((set) => ({
      devices: [],
      setDevices: (devices) =>
        set((state) => {
          state.devices = [...devices];
        })
    })),
    {
      name: 'store::devices',
      storage: createJSONStorage(() => storage)
    }
  )
);

export const devicesState = useDevicesStore.getState();
