import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import * as storage from '~/helpers/storage';
import { IGalleries } from '~/hooks/useGalleries';

export type GalleryState = {
  galleries: {
    [propertyId: string]: IGalleries;
  };
};

export type GalleryActions = {
  setGallery: (propertyId: string, galleries: IGalleries) => void;

  getGalleries: (propertyId: string) => IGalleries | null;
};

export const useGalleryStore = create(
  persist(
    immer<GalleryState & GalleryActions>((set, get) => ({
      galleries: {},
      setGallery: (propertyId, galleries) =>
        set((state) => {
          state.galleries[propertyId] = { ...galleries };
        }),

      getGalleries: (propertyId) => {
        return get().galleries[propertyId] || null;
      }
    })),
    {
      name: 'store::galleries',
      storage: createJSONStorage(() => storage)
    }
  )
);

export const galleryState = useGalleryStore.getState();
