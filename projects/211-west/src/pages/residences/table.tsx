import { Box, makeStyles, Checkbox, Typography } from '@material-ui/core';

import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useFilteredUnits } from '~/hooks/useFilteredUnits';
import { CompareContext } from '~/contexts/compare';
import ListTable from '~/components/residences/list-table';
import { useNavigate } from 'react-router';
import Formatter from '~/helpers/formatter';
import { palette } from '~/providers/theme';
import { useFilteredColumns } from '~/hooks/useFilteredColumns';
import { getNumberWithOrdinal } from '~/helpers/format-ordinal-number';
import { fullUnitSort } from '~/helpers/unitSorter';

export type Row = {
  id: string;
  status: string;
  unit?: string;
  floor: string;
  totalSqFt?: string;
  internalSqFt?: string;
  beds?: string;
  baths?: string;
};

const useStyles = makeStyles((theme) => ({
  content: {
    width: 'calc(100% - 6rem)',
    margin: '3rem',
    boxSizing: 'border-box',
    marginBottom: '0'
  },
  status: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#F2EEE8',
    width: '100%',
    height: '100%',
    color: '#001E60',
    fontWeight: 400,
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    padding: '1px 0 1.5px 1px'
  },
  available: {
    width: '1.5em',
    height: '1.5em',
    borderRadius: '50%',
    backgroundColor: theme.palette.background.paper,
    color: 'white'
  },
  headerCell: {
    color: 'white'
  },
  checkbox: {
    '& .MuiSvgIcon-root': {
      fill: theme.palette.background.paper
    }
  },
  checkboxWhite: {
    '& .MuiSvgIcon-root': {
      fill: `${palette.white} !important`
    }
  },
  pagination: {
    width: '100%',
    display: 'flex',
    color: 'white',
    justifyContent: 'center',

    '& .MuiSvgIcon-root': {
      color: 'white'
    }
  },
  tablePaginationRoot: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textTransform: 'uppercase',
    border: 'unset',

    '& .MuiSvgIcon-root': {
      fill: theme.palette.background.paper,
      fontSize: '1.5rem'
    },

    '& > *': {
      color: theme.palette.background.paper,
      borderRadius: 0,
      height: 30,
      padding: 0,

      '& :not(.MuiTypography-root)': {
        '&:active, :focus, :hover': {
          backgroundColor: 'white',
          color: theme.palette.background.paper,
          height: 30
        }
      }
    },

    '& .page-info': {
      minWidth: 'fit-content',
      fontSize: '1rem',
      padding: '0 10px',
      display: 'flex',
      alignItems: 'center',

      '& > *': {
        fontWeight: 600
      }
    }
  }
}));

export const Table = ({ className }: { className?: string }) => {
  const classes = useStyles();
  const [{ columns: residenceColumns }] = useFilteredColumns();

  const [{ visibleUnitModels: unitModels, visibleUnits: units }] =
    useFilteredUnits();
  const navigate = useNavigate();

  const { state: compareState, handlers: compareHandlers } =
    useContext(CompareContext);

  useEffect(() => {
    compareHandlers.reset();
  }, []);

  const handleRowClick = useCallback((unit: Row) => {
    navigate(`/residences/${unit.id}`);
  }, []);

  const rows: Row[] = useMemo(
    () =>
      fullUnitSort(units).map((unit) => {
        const unitModel = unitModels.find(
          (model) => model.id === unit.modelId
        )!;

        return {
          status: (unit.status || ' ')[0].toUpperCase(),
          id: unit.id || '',
          unit: unit.unitName || '',
          floor: Formatter.toNumber(unit.floor || 0),
          interiorSqFt: Formatter.toNumber(unitModel.interiorArea || 0),
          exteriorSqFt: Formatter.toNumber(unitModel.exteriorArea || 0),
          beds: unitModel.bedrooms?.toString() || '',
          baths: unit.bathrooms?.toString() || ''
        };
      }),
    [unitModels]
  );

  const sortedRows = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        floor: `${getNumberWithOrdinal(+row.floor)}`
      })),
    [rows]
  );

  const showColumn = (column: string) =>
    !residenceColumns.includes(column) || residenceColumns.includes('ALL');

  const columns = useMemo(
    () =>
      [
        ...(showColumn('STATUS')
          ? [
              {
                field: 'status',
                headerName: (
                  <Typography className={classes.headerCell}>STATUS</Typography>
                ),
                render: (status: any) => {
                  return (
                    <Box className={classes.available}>
                      <Typography>{status}</Typography>
                    </Box>
                  );
                }
              }
            ]
          : []),
        ...(showColumn('FLOOR')
          ? [
              {
                field: 'floor',
                headerName: (
                  <Typography className={classes.headerCell}>FLOOR</Typography>
                )
              }
            ]
          : []),
        ...(showColumn('UNIT')
          ? [
              {
                field: 'unit',
                headerName: (
                  <Typography className={classes.headerCell}>UNIT</Typography>
                )
              }
            ]
          : []),
        ...(showColumn('BEDROOMS')
          ? [
              {
                field: 'beds',
                headerName: (
                  <Typography className={classes.headerCell}>BEDS</Typography>
                )
              }
            ]
          : []),
        ...(showColumn('BATHROOMS')
          ? [
              {
                field: 'baths',
                headerName: (
                  <Typography className={classes.headerCell}>BATHS</Typography>
                )
              }
            ]
          : []),
        ...(showColumn('INTERIOR_SQFT')
          ? [
              {
                field: 'interiorSqFt',
                headerName: (
                  <Typography className={classes.headerCell}>
                    INT. SQ FT
                  </Typography>
                )
              }
            ]
          : []),
        ...(showColumn('EXTERIOR_SQFT')
          ? [
              {
                field: 'exteriorSqFt',
                headerName: (
                  <Typography className={classes.headerCell}>
                    EXT. SQ FT
                  </Typography>
                )
              }
            ]
          : []),
        {
          field: 'id',
          headerName: <Checkbox className={classes.checkboxWhite} disabled />,
          // TODO: fix ListTable type
          render: (id: any) => {
            if (!id) return null;

            return (
              <Checkbox
                className={classes.checkbox}
                checked={compareState.selected.includes(id)}
                onClick={(e) => {
                  e.stopPropagation();

                  compareHandlers.toggleUnit(id);
                }}
              />
            );
          }
        }
      ].flat(),
    [residenceColumns, compareState.selected]
  );

  const Table = useMemo(
    () => (
      <ListTable
        rows={sortedRows}
        columns={columns}
        elevation={0}
        onRowClick={handleRowClick}
      />
    ),
    [rows, columns]
  );

  return <Box className={classes.content}>{Table}</Box>;
};
