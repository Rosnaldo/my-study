import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import * as storage from '~/helpers/storage';

export type OrbitReelState = {
  orbitReelToken: string | null;
  orbitReelColorMapping: { [status: string]: string };
};

export type OrbitReelActions = {
  setOrbitReelToken: (token: string | null) => void;
  setOrbitReelColorMapping: (colorMapping: {
    [status: string]: string;
  }) => void;
};

export const useOrbitReelStore = create(
  persist(
    immer<OrbitReelState & OrbitReelActions>((set) => ({
      orbitReelToken: null,
      orbitReelColorMapping: {},

      setOrbitReelToken: (token) =>
        set((state) => {
          state.orbitReelToken = token;
        }),
      setOrbitReelColorMapping: (colorMapping) =>
        set((state) => {
          state.orbitReelColorMapping = { ...colorMapping };
        })
    })),
    {
      name: 'store::orbitReel',
      storage: createJSONStorage(() => storage)
    }
  )
);

export const orbitReelState = useOrbitReelStore.getState();
