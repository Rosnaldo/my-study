import styled from '@emotion/styled';
import { Box, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useSyncScroll } from '~/hooks/useSyncScroll';
import { palette } from '~/providers/theme';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    background: 'inherit',
    border: '1px solid #001E60'
  },
  table: {
    color: '#001E60',
    maxHeight: '100%',
    width: '100%',
    height: '100%',
    overflowY: 'hidden',

    '& .MuiSvgIcon-root': {
      fill: 'white'
    }
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr repeat(6, 2fr) 1fr',
    flexFlow: 'row nowrap',
    color: '#001E60',
    borderBottom: '1px solid #001E60',

    '& .SageUnitDetailsTable-cell': {
      '& .MuiSvgIcon-root': {
        fill: palette.paper
      }
    }
  },
  cell: {
    marginBottom: '1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '4em',
    width: '-webkit-fill-available',
    color: theme.palette.background.paper,
    background: 'inherit',
    textAlign: 'center',
    fontFamily: 'Garamond, serif'
  },
  header: {
    borderBottom: '1px solid #001E60',
    background: theme.palette.background.paper
  },
  body: {
    display: 'block',
    maxHeight: '64.5vh !important',
    color: '#001E60',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    scrollbarGutter: 'stable',
    cursor: 'pointer'
  }
}));

type Column<T> = {
  field: string;
  headerName?: React.ReactNode;
  render?: <U>(value: U, row: T) => React.ReactNode;
  className?: string;
};

type Props<T> = {
  className?: string;
  elevation?: number;
  rows: Array<T>;
  columns: Array<Column<T>>;

  onRowClick?: (row) => void;
};

const BoxWithRef = styled(Box)``;

const ListTable: React.FC<Props<object>> = ({
  elevation,
  columns,
  rows,
  onRowClick
}) => {
  const classes = useStyles();
  const { contentRef: tableContentRef } = useSyncScroll();

  const handleRowClick = (ev: React.MouseEvent, row: any) => {
    onRowClick?.(row);
  };

  return (
    <Paper
      elevation={elevation}
      className={`SageUnitDetailsTable-container ${classes.container}`}
    >
      <Box className={`SageUnitDetailsTable-table ${classes.table}`}>
        <Box className={`SageUnitDetailsTable-header ${classes.header}`}>
          <Box className={`SageUnitDetailsTable-row ${classes.row}`}>
            {columns.map((column, idx) => (
              <Box
                className={`SageUnitDetailsTable-cell ${classes.cell}`}
                key={`header-${column.field}-${idx}`}
              >
                {column.headerName}
              </Box>
            ))}
          </Box>
        </Box>
        <BoxWithRef
          {...{ ref: tableContentRef }}
          className={`SageUnitDetailsTable-body ${classes.body}`}
        >
          {rows.map((row, idx) => (
            <Box
              className={`SageUnitDetailsTable-row ${classes.row}`}
              onClick={(ev) => handleRowClick(ev, row)}
              key={idx}
            >
              {columns.map((column, idx) => (
                <Box
                  className={`SageUnitDetailsTable-cell ${classes.cell} ${
                    column.className || ''
                  }`}
                  key={`${column.field}-${idx}`}
                >
                  {column.render
                    ? column.render(row[column.field as keyof typeof row], row)
                    : row[column.field as keyof typeof row]}
                </Box>
              ))}
            </Box>
          ))}
        </BoxWithRef>
      </Box>
    </Paper>
  );
};

export default ListTable;
