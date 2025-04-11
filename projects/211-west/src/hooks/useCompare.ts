import uniq from 'lodash/uniq';
import { useEffect, useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { env } from '../helpers/env';
import { useSyncedState } from './useSyncedState';

// TYPE DEFINITIONS

export interface ICompareStore {
  comparingUnitIds: string[];
}

export const compareStore = proxy<ICompareStore>({
  comparingUnitIds: []
});

// STORE UPDATE FUNCTIONS

function addUnitToCompare(unitId: string) {
  compareStore.comparingUnitIds = uniq([
    ...compareStore.comparingUnitIds,
    unitId
  ]);
}

function removeUnitFromCompare(unitId: string) {
  compareStore.comparingUnitIds = compareStore.comparingUnitIds.filter(
    (compareId) => compareId !== unitId
  );
}

function toggleUnitOnCompare(unitId: string) {
  if (compareStore.comparingUnitIds.includes(unitId)) {
    removeUnitFromCompare(unitId);
  } else {
    addUnitToCompare(unitId);
  }
}

function resetUnitsOnCompare() {
  compareStore.comparingUnitIds = [];
}

// HOOK

export function useCompare() {
  const storeSnapshot = useSnapshot(compareStore);
  const [comparingUnitIds, setComparingUnitIds] = useSyncedState(
    'comparing-unit-ids',
    storeSnapshot.comparingUnitIds as string[]
  );

  // IPAD ONLY: send changes to comparing unit ids to companion
  useEffect(() => {
    if (env.IS_COMPANION) return;
    setComparingUnitIds(storeSnapshot.comparingUnitIds as string[]);
  }, [storeSnapshot.comparingUnitIds]);

  // COMPANION ONLY: update store with comparing unit ids from ipad
  useEffect(() => {
    if (!env.IS_COMPANION) return;
    compareStore.comparingUnitIds = comparingUnitIds;
  }, [comparingUnitIds]);

  // MEMOIZE STORE AND FUNCTIONS INTO A CONTEXT
  const context = useMemo(
    () => [
      storeSnapshot,
      {
        addUnitToCompare,
        removeUnitFromCompare,
        toggleUnitOnCompare,
        resetUnitsOnCompare
      }
    ],
    [storeSnapshot]
  );

  return context as [
    ICompareStore,
    {
      addUnitToCompare: typeof addUnitToCompare;
      removeUnitFromCompare: typeof removeUnitFromCompare;
      toggleUnitOnCompare: typeof toggleUnitOnCompare;
      resetUnitsOnCompare: typeof resetUnitsOnCompare;
    }
  ];
}
