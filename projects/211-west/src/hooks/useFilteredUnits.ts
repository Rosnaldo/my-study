import { useEffect, useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';
import {
  HorizontalFilterSetFilter,
  HorizontalFilterSetMultiOptionInput,
  HorizontalFilterSetSliderInput
} from '@evolutionv/vysta-ui/.build/v2/input/HorizontalFilterSet/types';
import { env } from '../helpers/env';
import { useCompanion } from './useCompanion';
import { UnitDetails, UnitModelDetails, useUnits } from './useUnits';
import {
  HorizontalFilterSetButtonInput,
  HorizontalFilterSetInput
} from '~/components/horizontal-filter-set/types';

// CONSTANTS

export const FILTER_BEDROOMS: HorizontalFilterSetMultiOptionInput = {
  id: 'bedrooms',
  label: 'BEDS',
  options: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: 'ALL', value: 'ALL' }
  ]
};

export const FILTER_BATHROOMS: HorizontalFilterSetMultiOptionInput = {
  id: 'bathrooms',
  label: 'BATHS',
  options: [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: 'ALL', value: 'ALL' }
  ]
};

export interface UnitFilterMap {
  bedrooms: string[];
  bathrooms: string[];
  lines: string[];
  floors: string[];
  'interior-sqft': number;
  'exterior-sqft': number;
  'search-unit': string;
}

export interface IFilteredUnitsStore {
  filters: UnitFilterMap;
  visibleUnits: UnitDetails[];
  visibleUnitModels: UnitModelDetails[];
}

export const FILTER_EXTERIOR_SQFT: HorizontalFilterSetSliderInput = {
  id: 'exterior-sqft',
  label: 'EXTERIOR SQ. FT.',
  minValue: 200,
  maxValue: 3000,
  maxLabel: 'NO MAX',
  valueLabel: '$value',
  step: 1
};

export const FILTER_INTERIOR_SQFT: HorizontalFilterSetSliderInput = {
  id: 'interior-sqft',
  label: 'INTERIOR SQ. FT.',
  minValue: 200,
  maxValue: 3000,
  maxLabel: 'NO MAX',
  valueLabel: '$value',
  step: 1
};

export const filteredUnitsStore = proxy<IFilteredUnitsStore>({
  filters: {
    bedrooms: ['ALL'],
    bathrooms: ['ALL'],
    lines: ['ALL'],
    floors: ['ALL'],
    'interior-sqft': FILTER_INTERIOR_SQFT.maxValue,
    'exterior-sqft': FILTER_EXTERIOR_SQFT.maxValue,
    'search-unit': ''
  },
  visibleUnits: [],
  visibleUnitModels: []
});

export const FILTERS = (
  lines: any,
  floors: any
): HorizontalFilterSetFilter[] => [
  {
    type: 'multi-option',
    data: FILTER_BEDROOMS
  },
  {
    type: 'multi-option',
    data: FILTER_BATHROOMS
  },
  {
    type: 'menu',
    data: {
      id: 'search-lines',
      label: 'LINE',
      options: lines
    }
  },
  {
    type: 'menu',
    data: {
      id: 'search-floor',
      label: 'FLOOR',
      options: floors
    }
  },
  {
    type: 'menu',
    data: {
      id: 'search-options',
      label: 'OPTIONS',
      options: [
        {
          type: 'slider',
          data: FILTER_EXTERIOR_SQFT
        },
        {
          type: 'slider',
          data: FILTER_INTERIOR_SQFT
        },
        {
          type: 'divider',
          data: {}
        },
        {
          type: 'label',
          data: {
            id: 'columns',
            label: 'COLUMNS'
          }
        },
        {
          type: 'button',
          data: {
            id: 'residence_all',
            label: 'ALL',
            icon: true,
            type: 'column'
          } as HorizontalFilterSetButtonInput
        },
        {
          type: 'button',
          data: {
            id: 'residence_status',
            label: 'STATUS',
            icon: true,
            type: 'column'
          } as HorizontalFilterSetButtonInput
        },
        {
          type: 'button',
          data: {
            id: 'residence_unit',
            label: 'UNIT',
            icon: true,
            type: 'column'
          } as HorizontalFilterSetButtonInput
        },
        {
          type: 'button',
          data: {
            id: 'residence_floor',
            label: 'FLOOR',
            icon: true,
            type: 'column'
          } as HorizontalFilterSetButtonInput
        },
        {
          type: 'button',
          data: {
            id: 'residence_interior_sqft',
            label: 'INT. SQ FT',
            icon: true,
            type: 'column'
          } as HorizontalFilterSetButtonInput
        },
        {
          type: 'button',
          data: {
            id: 'residence_exterior_sqft',
            label: 'EXT. SQ FT',
            icon: true,
            type: 'column'
          } as HorizontalFilterSetButtonInput
        },
        {
          type: 'button',
          data: {
            id: 'residence_bedrooms',
            label: 'BED',
            icon: true,
            type: 'column'
          } as HorizontalFilterSetButtonInput
        },
        {
          type: 'button',
          data: {
            id: 'residence_bathrooms',
            label: 'BATHS',
            icon: true,
            type: 'column'
          } as HorizontalFilterSetButtonInput
        }
      ]
    }
  },
  {
    type: 'text-field-with-icon',
    data: {
      id: 'search-unit',
      boxId: 'search-unit-box',
      label: 'SEARCH FOR UNIT',
      type: 'text'
    } as HorizontalFilterSetInput
  },
  {
    type: 'button',
    data: {
      id: 'compare',
      label: 'COMPARE'
    }
  },
  {
    type: 'button',
    data: {
      id: 'reset',
      label: 'RESET'
    }
  }
];

// STORE UPDATE FUNCTIONS

function resetFilter(id: string, defaultValue: unknown = null) {
  filteredUnitsStore.filters = {
    ...filteredUnitsStore.filters,
    [id]: defaultValue
  };
}

function addAllToFilter(id: string, options: string[]) {
  filteredUnitsStore.filters = {
    ...filteredUnitsStore.filters,
    [id]: options
  };
}

const ArrayRemoveElem = (array: Array<string>, value: string) => {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
};

function toggleFilter(id: string, value: string) {
  const array = filteredUnitsStore.filters[id];

  if (value === 'ALL') {
    filteredUnitsStore.filters = {
      ...filteredUnitsStore.filters,
      [id]: [value]
    };
    return;
  }
  if (array.includes('ALL')) {
    ArrayRemoveElem(array, 'ALL');
  }
  if (array.includes(value)) {
    ArrayRemoveElem(array, value);
  } else {
    array.push(value);
  }
  if (array.length === 0) {
    array.push('ALL');
  }

  filteredUnitsStore.filters = {
    ...filteredUnitsStore.filters,
    [id]: [...filteredUnitsStore.filters[id]]
  };
}

function setFilter(id: string, value: string | number | boolean | string[]) {
  filteredUnitsStore.filters = {
    ...filteredUnitsStore.filters,
    [id]: value
  };
}

function updateFilter(id: string, value?: string | number | string[]) {
  switch (id) {
    case 'bedrooms':
      if (value === 'ALL') return setFilter('bedrooms', ['ALL']);
      return toggleFilter('bedrooms', value as string);
    case 'bathrooms':
      if (value === 'ALL') return setFilter('bathrooms', ['ALL']);
      return toggleFilter('bathrooms', value as string);
    case 'interior-sqft':
      return setFilter('interior-sqft', value as number);
    case 'exterior-sqft':
      return setFilter('exterior-sqft', value as number);
    case 'lines':
      if (value === 'ALL') return setFilter('lines', ['ALL']);
      return toggleFilter('lines', value as string);
    case 'floors':
      if (value === 'ALL') return setFilter('floors', ['ALL']);
      return toggleFilter('floors', value as string);
    case 'search-unit':
      return setFilter('search-unit', value as string);
    case 'reset':
      setFilter('bedrooms', ['ALL']);
      setFilter('bathrooms', ['ALL']);
      setFilter('lines', ['ALL']);
      setFilter('floors', ['ALL']);
      setFilter('interior-sqft', 3000);
      setFilter('exterior-sqft', 3000);
      setFilter('search-unit', '');
      return;
    default:
      return;
  }
}

// HOOK

export function useFilteredUnits() {
  const storeSnapshot = useSnapshot(filteredUnitsStore);
  const { units, unitModels } = useUnits();
  const [{ isConnected }, { on, send }] = useCompanion();

  // IPAD ONLY update companion filters
  useEffect(() => {
    if (env.IS_COMPANION || !isConnected) return;
    send('filtered-units:filters', storeSnapshot.filters);
  }, [storeSnapshot.filters]);

  // COMPANION ONLY update companion filters
  useEffect(() => {
    if (!env.IS_COMPANION) return;
    return on('filtered-units:filters', (_, filters: UnitFilterMap) => {
      filteredUnitsStore.filters = filters;
    });
  }, []);

  // update units
  useEffect(() => {
    const filter = storeSnapshot.filters;

    const visibleUnitModelsIds: string[] = [];

    filteredUnitsStore.visibleUnits = units
      .filter((unit) => {
        let show = true;

        /**
         * bedrooms
         */
        if (!filter.bedrooms.includes('ALL')) {
          if (!filter.bedrooms.includes(unit.bedrooms)) show = false;
        }

        /**
         * bathrooms
         */
        if (!filter.bathrooms.includes('ALL')) {
          if (!filter.bathrooms.includes(unit.bathrooms?.split(',')[0]))
            show = false;
        }

        /**
         * Interior SqFt
         */
        const interiorSqFt = +unit?.interiorSqFt || 0;

        if (
          filter['interior-sqft'] !== FILTER_INTERIOR_SQFT.maxValue &&
          interiorSqFt > filter['interior-sqft']
        ) {
          show = false;
        }

        /**
         * Exterior SqFt
         */
        const exteriorSqFt = +unit?.exteriorSqFt || 0;

        if (
          filter['exterior-sqft'] !== FILTER_EXTERIOR_SQFT.maxValue &&
          exteriorSqFt > filter['exterior-sqft']
        ) {
          show = false;
        }

        /**
         * Line
         */
        if (!filter.lines.includes('ALL')) {
          if (!filter.lines.includes(unit.unitName)) {
            show = false;
          }
        }

        /**
         * Floor
         */
        if (!filter.floors.includes('ALL')) {
          if (!filter.floors.includes(unit.floorName as string)) {
            show = false;
          }
        }

        /**
         * Search name
         */
        if (filter['search-unit'].length > 0) {
          if (!unit.unitName.includes(filter['search-unit'])) {
            show = false;
          }
        }

        if (show && !visibleUnitModelsIds.includes(unit.modelId))
          visibleUnitModelsIds.push(unit.modelId);

        return show;
      })
      .sort((a, b) => a.unitName.localeCompare(b.unitName));

    filteredUnitsStore.visibleUnitModels = visibleUnitModelsIds
      .map((id) => unitModels[id])
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [storeSnapshot.filters, units]);

  // MEMOIZE STORE AND FUNCTIONS INTO A CONTEXT
  const context = useMemo(
    () => [
      storeSnapshot,
      {
        resetFilter,
        addAllToFilter,
        toggleFilter,
        setFilter,
        updateFilter
      }
    ],
    [storeSnapshot]
  );

  return context as [
    IFilteredUnitsStore,
    {
      resetFilter: typeof resetFilter;
      addAllToFilter: typeof addAllToFilter;
      toggleFilter: typeof toggleFilter;
      setFilter: typeof setFilter;
      updateFilter: typeof updateFilter;
    }
  ];
}
