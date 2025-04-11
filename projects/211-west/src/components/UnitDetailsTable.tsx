import { Box, makeStyles, Paper } from '@material-ui/core';
import {
  UIEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    background: 'inherit'
  },
  table: {
    color: theme.palette.getContrastText(theme.palette.background.paper),
    height: '100%',
    width: '100%',
    overflowX: 'auto'
  },
  row: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  cell: {
    marginBottom: '1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '4em',
    width: '9em',
    color: 'inherit',
    background: 'inherit',
    textAlign: 'center'
  },
  header: {
    '& .SageUnitDetailsTable-cell': {
      background: theme.palette.background.paper,
      color: theme.palette.background.default
    }
  },
  body: {
    color: theme.palette.background.paper,
    overflowY: 'auto',
    height: 'calc(100% - 4em - 1px)'
  }
}));

export interface UnitDetailsTableProps<T extends object> {
  rows: Array<T>;
  columns: {
    field: string;
    headerName: string;
    render?: <U>(value: U, data: T) => React.ReactNode;
    className?: string;
  }[];
  headerId?: string;
  bodyId?: string;
  className?: string;
  onRowClick?: (row: T) => void;
  onScroll?: UIEventHandler<HTMLDivElement>;
}

export function UnitDetailsTable<T extends object>({
  rows: allRows,
  columns,
  headerId,
  bodyId,
  className = '',
  onRowClick,
  onScroll
}: UnitDetailsTableProps<T>) {
  const classes = useStyles();

  const [rows, setRows] = useState<T[]>([]);
  const [endIndex, setEndIndex] = useState(20);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const floorplansContainer = containerRef.current;
    if (floorplansContainer) {
      const { scrollTop, scrollHeight, clientHeight } = floorplansContainer;
      if (scrollTop + clientHeight >= scrollHeight) {
        setEndIndex((prevEndIndex) => prevEndIndex + 10);
      }
    }
  };

  useEffect(() => {
    const floorplansContainer = containerRef.current;

    if (!floorplansContainer) return;

    floorplansContainer.addEventListener('scroll', handleScroll);
    return () => {
      floorplansContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setRows(allRows.slice(0, endIndex));
  }, [allRows, endIndex]);

  const handleRowClick = useCallback(
    (ev: React.MouseEvent, row: T) => {
      ev.preventDefault();
      onRowClick?.(row);
    },
    [onRowClick]
  );

  return (
    <Paper
      className={`SageUnitDetailsTable-container ${classes.container} ${className}`}
    >
      <Box className={`SageUnitDetailsTable-table ${classes.table}`}>
        <Box
          id={headerId}
          className={`SageUnitDetailsTable-header ${classes.header}`}
        >
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
        <Box
          id={bodyId}
          className={`SageUnitDetailsTable-body ${classes.body}`}
          onScroll={onScroll}
          {...{ ref: containerRef }}
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
                  <span>
                    {column.render
                      ? column.render(
                          row[column.field as keyof typeof row],
                          row
                        )
                      : row[column.field as keyof typeof row]}
                  </span>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
