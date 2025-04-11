import { create } from 'zustand';

import { createJSONStorage, persist } from 'zustand/middleware';

import { immer } from 'zustand/middleware/immer';

import * as storage from '~/helpers/storage';

export type MediasManifest = {
  [propertyId: string]: {
    [id: string]: string;
  };
};

export type MediaState = {
  medias: MediasManifest;
};

export type MediaActions = {
  setMedias: (propertyId: string, medias: { [id: string]: string }) => void;

  updateMediaById: (propertyId: string, id: string, src: string) => void;

  clearMediaByPropertyId: (propertyId: string) => void;
};

export const useMediaStore = create(
  persist(
    immer<MediaState & MediaActions>((set) => ({
      medias: {},

      setMedias: (propertyId, medias) =>
        set((state) => {
          state.medias[propertyId] = { ...medias };
        }),

      updateMediaById: (propertyId, id, src) =>
        set((state) => {
          state.medias[propertyId] = {
            ...(state.medias[propertyId] || {}),

            [id]: src
          };
        }),

      clearMediaByPropertyId: (propertyId) =>
        set((state) => {
          state.medias = { ...state.medias, [propertyId]: {} };
        })
    })),

    {
      name: 'store::media',

      storage: createJSONStorage(() => storage)
    }
  )
);

export const mediaState = useMediaStore.getState();
