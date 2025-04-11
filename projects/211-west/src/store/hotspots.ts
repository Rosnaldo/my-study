import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { Hotspot } from '~/api';
import * as storage from '~/helpers/storage';

export type HotspotsState = {
  hotspots: Hotspot[];
};

export type HotspotsActions = {
  setHotspots: (hotspots: Hotspot[]) => void;
};

export const useHotspotsStore = create(
  persist(
    immer<HotspotsState & HotspotsActions>((set) => ({
      hotspots: [],
      setHotspots: (hotspots) =>
        set((state) => {
          state.hotspots = [...hotspots];
        })
    })),
    {
      name: 'store::hotspot',
      storage: createJSONStorage(() => storage)
    }
  )
);

export const hotspotsState = useHotspotsStore.getState();
