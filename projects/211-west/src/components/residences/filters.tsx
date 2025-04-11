import { Box, makeStyles } from '@material-ui/core';
import { useCallback, useContext, useMemo, useState } from 'react';
import clsx from 'clsx';
import { FILTERS, useFilteredUnits } from '~/hooks/useFilteredUnits';
import { CompareContext } from '~/contexts/compare';
import { HorizontalFilterSet } from '../horizontal-filter-set';
import { useUnits } from '~/hooks/useUnits';
import { HorizontalFilterSetButtonInput } from '../horizontal-filter-set/types';
import { useNavigate } from 'react-router';
import { palette } from '~/providers/theme';
import { useFilteredColumns } from '~/hooks/useFilteredColumns';
import { fullUnitSort } from '~/helpers/unitSorter';

const font = {
  fontSize: '1.05vw',
  fontWeight: 300
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  filters: ({ selected }: { selected: boolean }) => ({
    height: '100%',
    width: '100%',
    color: 'white',
    display: 'flex',

    '& > *': {
      flex: 1,
      width: '100%'
    },

    '& * + *': {
      width: 'fit-content'
    },

    '& > div > *': font,
    '& > div > div > button > span': font,

    '& > .MuiBox-root': {
      padding: '1rem 0'
    },

    '& > .MuiDivider-root': {
      width: '1px',
      maxWidth: '1px',
      background: theme.palette.common.white,
      margin: 0,
      padding: 0
    },

    '& #horizontal-filter-set-search-lines, #horizontal-filter-set-search-floor, #horizontal-filter-set-search-options, #horizontal-filter-set-compare, #horizontal-filter-set-reset':
      {
        ...font,
        borderRight: '1px solid white'
      },

    '& #horizontal-filter-set-reset': {
      border: 'none'
    },

    '& #horizontal-filter-set-search-unit, #horizontal-filter-set-bedrooms, #horizontal-filter-set-bathrooms':
      {
        borderRight: '1px solid white'
      },

    '& #horizontal-filter-set-search-unit': {
      flex: 1,
      padding: '0 1rem',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '0.5rem'
    },

    '& .horizontal-filter-set-multi-option': {
      flex: 3,
      flexDirection: 'column',

      '& button.hint': {
        background: theme.palette.common.white,

        '& span': {
          color: theme.palette.background.paper
        }
      },
      '& button > span': {
        lineHeight: '.6',
        margin: 'auto',
        transform: 'translateY(10%)'
      },

      '& > div': {
        overflow: 'hidden',

        '& > button': {
          margin: 0,
          border: `1px solid white`,
          borderRadius: 0,
          borderLeft: 'none',
          width: 'unset',
          padding: '0 0.8rem',
          height: '2rem'
        },
        '& > button:first-child': {
          borderLeft: `1px solid white`,
          borderTopLeftRadius: '3rem',
          borderBottomLeftRadius: '3rem'
        },
        '& > button:last-child': {
          borderTopRightRadius: '3rem',
          borderBottomRightRadius: '3rem'
        }
      }
    },

    '& #horizontal-filter-set-compare': {
      ...font,
      background: selected ? palette.floor : theme.palette.background.paper,
      color: selected
        ? theme.palette.background.paper
        : theme.palette.common.white
    }
  })
}));

export const ResidenceFilters = ({
  className = ''
}: {
  className?: string;
}) => {
  const {
    handlers: compareHandlers,
    state: { selected }
  } = useContext(CompareContext);
  const classes = useStyles({ selected: selected.length > 0 });
  const [_, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (target: HTMLElement) => {
    setAnchorEl(target);
  };
  const { units } = useUnits();
  const [{ columns }, { updateColumnsFilter }] = useFilteredColumns();
  const [{ filters }, { updateFilter }] = useFilteredUnits();
  const navigate = useNavigate();

  const unitNames = useMemo(
    () => fullUnitSort(units).map((unit) => unit.unitName),
    [units]
  );

  const floorNames = useMemo(
    () =>
      Array.from(new Set(units.map((unit) => unit.floorName as string))).sort(
        (a, b) => (Number(a as string) > Number(b as string) ? 1 : -1)
      ),
    [units]
  );

  const { state } = useContext(CompareContext);
  const hint = useMemo(
    () =>
      [
        filters.bedrooms.map((value) => `bedrooms__${value}`),
        filters.bathrooms.map((value) => `bathrooms__${value}`),
        `interior-sqft__${filters['interior-sqft']}`,
        `exterior-sqft__${filters['exterior-sqft']}`
      ].flat(),
    [filters]
  );

  const filtersInput = useMemo(
    () =>
      FILTERS(
        [
          {
            type: 'button',
            data: {
              id: `lines__ALL`,
              label: 'ALL',
              icon: true,
              type: 'line'
            } as HorizontalFilterSetButtonInput
          },
          ...unitNames.map((u) => ({
            type: 'button',
            data: {
              id: `lines__${u}`,
              label: u,
              icon: true,
              type: 'line'
            } as HorizontalFilterSetButtonInput
          }))
        ],
        [
          {
            type: 'button',
            data: {
              id: `floors__ALL`,
              label: 'ALL',
              icon: true,
              type: 'floor'
            } as HorizontalFilterSetButtonInput
          },
          ...floorNames.map((u) => ({
            type: 'button',
            data: {
              id: `floors__${u}`,
              label: u,
              icon: true,
              type: 'floor'
            } as HorizontalFilterSetButtonInput
          }))
        ]
      ),
    [unitNames, floorNames]
  );

  const ArrayRemoveElem = (array: Array<string>, value: string) => {
    const index = array.indexOf(value);
    if (index > -1) {
      array.splice(index, 1);
    }
  };

  const handleFilterUpdate = useCallback(
    (id: string, value?: string | number | string[] | undefined) => {
      if (id.includes('residence')) {
        const newColumns = [...columns];
        if (id === 'residence_all') {
          updateColumnsFilter(['ALL']);
          return;
        }
        const column = id.replaceAll('residence_', '').toUpperCase();
        if (newColumns.includes('ALL')) {
          ArrayRemoveElem(newColumns, 'ALL');
        }
        if (newColumns.includes(column)) {
          ArrayRemoveElem(newColumns, column);
        } else {
          newColumns.push(column);
        }
        if (newColumns.length === 0) {
          newColumns.push('ALL');
        }
        updateColumnsFilter(newColumns);
        return;
      }
      if (id === 'columns') {
        const target = window.document.getElementById(
          'horizontal-filter-set-columns'
        );
        if (target) {
          handleClick(target);
        }
      }

      if (id === 'reset') {
        compareHandlers.reset();
        updateColumnsFilter(['ALL']);
        updateFilter('reset', value);
      } else if (id === 'compare') {
        navigate('/compare');
      } else if (id.includes('lines')) {
        updateFilter('lines', (value as string).replaceAll('lines__', ''));
      } else if (id.includes('floors')) {
        updateFilter('floors', (value as string).replaceAll('floors__', ''));
      } else {
        updateFilter(id, value);
      }
    },
    [updateFilter, state.canCompare, columns]
  );

  return (
    <Box className={clsx(className, classes.root)}>
      <HorizontalFilterSet
        className={classes.filters}
        filters={filtersInput}
        hint={hint}
        onInput={handleFilterUpdate}
        labelFontColor="#fff"
        justify="space-evenly"
        minHeight={false}
        shouldDivideOptions={false}
      />
    </Box>
  );
};
