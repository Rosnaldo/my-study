import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import * as storage from '~/helpers/storage';
import { OrbitReel, PointsOfInterestCollection, Property } from '~/api';

export type PropertyState = {
  properties: {
    [propertyId: string]: Property;
  };
};

export type PropertyActions = {
  setProperty: (propertyId: string, property: Property) => void;

  getOrbitReel: (propertyId: string) => OrbitReel | null;
  getUnitNames: (propertyId: string) => string[];
  getProperty: (propertyId: string) => Property | null;
  getPois: (propertyId: string) => PointsOfInterestCollection[];
};

export const usePropertyStore = create(
  persist(
    immer<PropertyState & PropertyActions>((set, get) => ({
      properties: {},
      setProperty: (propertyId, property) =>
        set((state) => {
          state.properties[propertyId] = { ...property };
        }),

      getProperty: (propertyId) => {
        return get().properties[propertyId] || null;
      },
      getOrbitReel: (propertyId) => {
        const property = get().properties[propertyId];

        return (
          property?.components?.reduce(
            (orbitReelId, component) =>
              orbitReelId ||
              component?.orbitReels?.find((orbitReel) => orbitReel?.id) ||
              null,
            null as OrbitReel | null
          ) || null
        );
      },
      getUnitNames: (propertyId) => {
        const property = get().properties[propertyId];

        return (
          property?.components?.flatMap(
            (component) =>
              component?.units?.flatMap((unit) => unit?.name || []) || []
          ) || []
        );
      },
      getPois: (propertyId) => {
        const property = get().properties[propertyId];
        return (property?.components?.[0]?.pointsOfInterestCollections ||
          []) as PointsOfInterestCollection[];
      }
    })),
    {
      name: 'store::property',
      storage: createJSONStorage(() => storage)
    }
  )
);

export const propertyState = usePropertyStore.getState();
