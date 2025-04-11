import { useEffect, useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { env } from '../helpers/env';
import { useCompanion } from './useCompanion';

// CONSTANTS

type IFilteredColumnsStore = {
  columns: string[];
};

export const filteredUnitsStore = proxy<IFilteredColumnsStore>({
  columns: []
});

function updateColumnsFilter(columns: string[]) {
  filteredUnitsStore.columns = columns;
}

// HOOK

export function useFilteredColumns() {
  const storeSnapshot = useSnapshot(filteredUnitsStore);
  const [{ isConnected }, { on, send }] = useCompanion();

  // IPAD ONLY update companion filters
  useEffect(() => {
    if (env.IS_COMPANION || !isConnected) return;
    send('filtered-columns:filters', storeSnapshot.columns);
  }, [storeSnapshot.columns]);

  // COMPANION ONLY update companion filters
  useEffect(() => {
    if (!env.IS_COMPANION) return;
    return on('filtered-columns:filters', (_, columns: string[]) => {
      filteredUnitsStore.columns = columns;
    });
  }, []);

  // update columns
  useEffect(() => {
    const columns = storeSnapshot.columns;
  }, [storeSnapshot.columns]);

  // MEMOIZE STORE AND FUNCTIONS INTO A CONTEXT
  const context = useMemo(
    () => [
      storeSnapshot,
      {
        updateColumnsFilter
      }
    ],
    [storeSnapshot]
  );

  return context as [
    IFilteredColumnsStore,
    {
      updateColumnsFilter: typeof updateColumnsFilter;
    }
  ];
}
