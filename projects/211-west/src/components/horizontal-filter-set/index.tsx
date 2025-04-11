import { Box, Theme, makeStyles } from '@material-ui/core';
import { HorizontalFilterSetFilter } from './types';
import { renderFilter } from './render';

const useStyles = makeStyles<
  Theme,
  { justify: 'center' | 'space-evenly'; minHeight: boolean }
>((theme) => ({
  root: {
    minHeight: ({ minHeight }) => (minHeight ? '4em' : 'unset'),
    width: '100%',
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: ({ justify }) => justify,
    background: theme.palette.background.paper,
    color: theme.palette.background.default,

    '& .MuiTypography-root': { color: 'inherit', userSelect: 'none' },
    '& .MuiButton-root': {
      color: 'inherit',
      minWidth: ({ minHeight }) => (minHeight ? 'auto' : 'fit-content')
    },
    '& .MuiDivider-root': {
      height: '0.1em'
    },
    '& .MuiDivider-vertical': {
      height: 'auto',
      width: '0.1em',
      margin: ({ minHeight }) => (minHeight ? '1em' : '0.5em')
    },

    '& .hint': {
      color: theme.palette.primary.main
    }
  }
}));

export interface HorizontalFilterSetProps {
  className?: string;
  hint: string[];
  filters: HorizontalFilterSetFilter[];
  onInput: (id: string, value?: string | number | string[]) => void;
  labelFontColor?: string;
  shouldDivideOptions?: boolean;
  disabled?: boolean;
  justify?: 'center' | 'space-evenly';
  minHeight?: boolean;
  popoverClassName?: string;
}

export function HorizontalFilterSet({
  filters,
  hint,
  className = '',
  onInput,
  labelFontColor,
  shouldDivideOptions,
  disabled = false,
  justify = 'center',
  minHeight = true,
  popoverClassName
}: HorizontalFilterSetProps) {
  const classes = useStyles({ justify, minHeight });

  return (
    <Box className={`${classes.root} SageControl ${className}`}>
      {filters.map((filter, idx) =>
        renderFilter(
          filter,
          idx,
          hint,
          onInput,
          false,
          labelFontColor,
          disabled,
          shouldDivideOptions,
          popoverClassName
        )
      )}
    </Box>
  );
}
