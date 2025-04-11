import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import * as storage from '~/helpers/storage';
import { Amenity } from '~/api';

export type AmenitiesState = {
  amenities: Amenity[];
};

export type AmenitiesActions = {
  setAmenities: (amenities: Amenity[]) => void;
};

export const useAmenitiesStore = create(
  persist(
    immer<AmenitiesState & AmenitiesActions>((set) => ({
      amenities: [],
      setAmenities: (amenities) =>
        set((state) => {
          state.amenities = [...amenities];
        })
    })),
    {
      name: 'store::amenities',
      storage: createJSONStorage(() => storage)
    }
  )
);

export const amenitiesState = useAmenitiesStore.getState();
