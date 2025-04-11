import uniq from 'lodash/uniq';
import { useCallback, useEffect, useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { env } from '~/helpers/env';
import { LightingFormater } from '~/helpers/lighting';
import { useCompanion } from '~/hooks/useCompanion';
import { useSyncedState } from '~/hooks/useSyncedState';

// TYPE DEFINITIONS

export interface ILightingStore {
  selectedUnitNames: string[];
  selectedAmenities: string[];
  lastSelectedUnit: string | null;
  lightingActive: boolean;
  lightingMode: 'default' | 'always-on';
}

export const lightingStore = proxy<ILightingStore>({
  selectedUnitNames: [],
  selectedAmenities: [],
  lastSelectedUnit: null,
  lightingActive: true,
  lightingMode: 'default'
});

// STORE UPDATE FUNCTIONS

function addSelectedUnit(unitName: string) {
  lightingStore.selectedUnitNames = uniq([
    ...lightingStore.selectedUnitNames,
    unitName
  ]);
  lightingStore.lastSelectedUnit = unitName;
}

function updateSelectedUnits(unitNames: string[]) {
  lightingStore.selectedUnitNames = uniq([...unitNames]);
}

function removeSelectedUnit(unitName: string) {
  lightingStore.selectedUnitNames = lightingStore.selectedUnitNames.filter(
    (selectedId) => selectedId !== unitName
  );
}

function resetSelectedUnits() {
  lightingStore.selectedUnitNames = [];
}

function toggleSelectedUnit(unitName: string) {
  if (lightingStore.selectedUnitNames.includes(unitName)) {
    removeSelectedUnit(unitName);
  } else {
    addSelectedUnit(unitName);
  }
}

function addSelectedAmenity(amenityId: string) {
  lightingStore.selectedAmenities = uniq([
    ...lightingStore.selectedAmenities,
    amenityId
  ]);
}

function removeSelectedAmenity(amenityId: string) {
  lightingStore.selectedAmenities = lightingStore.selectedAmenities.filter(
    (selectedId) => selectedId !== amenityId
  );
}

function toggleSelectedAmenity(amenityId: string) {
  if (lightingStore.selectedAmenities.includes(amenityId)) {
    removeSelectedAmenity(amenityId);
  } else {
    addSelectedAmenity(amenityId);
  }
}

function resetSelectedAmenities() {
  lightingStore.selectedAmenities = [];
}

function updateLastSelectedUnit(unitName: string) {
  lightingStore.lastSelectedUnit = unitName;
}

function resetLastSelectedUnit() {
  lightingStore.lastSelectedUnit = null;
}

function toggleLightingMode() {
  lightingStore.lightingMode =
    lightingStore.lightingMode === 'default' ? 'always-on' : 'default';
}

function toggleLightingActive() {
  const newState = !lightingStore.lightingActive;

  if (!newState) {
    lightingStore.selectedUnitNames = [];
    lightingStore.lastSelectedUnit = null;
  }

  lightingStore.lightingActive = newState;
}

const BRIGHTNESS = {
  EMPTY: 0,
  FULL: 255
};

// HOOK

export function useLighting() {
  const storeSnapshot = useSnapshot(lightingStore);
  const [{}, { sendTcp }] = useCompanion();
  const [sharedSelectedUnits, setSharedSelectedUnitNames] = useSyncedState(
    'selected-unit-names',
    storeSnapshot.selectedUnitNames as string[]
  );
  const [sharedLastSelectedUnit, setSharedLastSelectedUnit] = useSyncedState(
    'last-selected-unit',
    storeSnapshot.lastSelectedUnit as string
  );

  // IPAD ONLY: send changes to selected unit names to companion
  useEffect(() => {
    if (env.IS_COMPANION) return;
    setSharedSelectedUnitNames(storeSnapshot.selectedUnitNames as string[]);
  }, [storeSnapshot.selectedUnitNames]);

  // COMPANION ONLY: update store with selected unit names from ipad
  useEffect(() => {
    if (!env.IS_COMPANION) return;
    lightingStore.selectedUnitNames = sharedSelectedUnits;
  }, [sharedSelectedUnits]);

  // IPAD ONLY: send changes to last selected unit to companion
  useEffect(() => {
    if (env.IS_COMPANION) return;
    setSharedLastSelectedUnit(storeSnapshot.lastSelectedUnit as string);
  }, [storeSnapshot.lastSelectedUnit]);

  // COMPANION ONLY: update store with last selected unit from ipad
  useEffect(() => {
    if (!env.IS_COMPANION) return;
    lightingStore.lastSelectedUnit = sharedLastSelectedUnit;
  }, [sharedLastSelectedUnit]);

  const sendUpdateCommand = useCallback(
    async (unitName: string, mode: keyof typeof BRIGHTNESS) => {
      await sendTcp(LightingFormater.send(unitName, BRIGHTNESS[mode]));
    },
    [sendTcp]
  );

  const sendResetCommand = useCallback(async () => {
    await sendTcp(LightingFormater.reset());
  }, [sendTcp]);

  // MEMOIZE STORE AND FUNCTIONS INTO A CONTEXT
  const context = useMemo(
    () => [
      storeSnapshot,
      {
        addSelectedUnit,
        updateSelectedUnits,
        removeSelectedUnit,
        toggleSelectedUnit,
        resetSelectedUnits,
        addSelectedAmenity,
        removeSelectedAmenity,
        toggleSelectedAmenity,
        resetSelectedAmenities,
        resetLastSelectedUnit,
        updateLastSelectedUnit,
        toggleLightingMode,
        toggleLightingActive,
        sendResetCommand,
        sendUpdateCommand
      }
    ],
    [storeSnapshot]
  );

  return context as [
    ILightingStore,
    {
      addSelectedUnit: typeof addSelectedUnit;
      updateSelectedUnits: typeof updateSelectedUnits;
      removeSelectedUnit: typeof removeSelectedUnit;
      toggleSelectedUnit: typeof toggleSelectedUnit;
      resetSelectedUnits: typeof resetSelectedUnits;
      addSelectedAmenity: typeof addSelectedAmenity;
      removeSelectedAmenity: typeof removeSelectedAmenity;
      toggleSelectedAmenity: typeof toggleSelectedAmenity;
      resetSelectedAmenities: typeof resetSelectedAmenities;
      resetLastSelectedUnit: typeof resetLastSelectedUnit;
      updateLastSelectedUnit: typeof updateLastSelectedUnit;
      toggleLightingMode: typeof toggleLightingMode;
      toggleLightingActive: typeof toggleLightingActive;
      sendResetCommand: typeof sendResetCommand;
      sendUpdateCommand: typeof sendUpdateCommand;
    }
  ];
}
