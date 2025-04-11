import {
  Box,
  Button,
  makeStyles,
  Popover,
  PopoverOrigin,
  Theme
} from '@material-ui/core';
import { useCallback, useMemo, useState } from 'react';
import { renderFilter } from '../render';
import {
  HorizontalFilterSetFilter,
  HorizontalFilterSetInputProps,
  HorizontalFilterSetMenuInput
} from '../types';
import clsx from 'clsx';
import { KeyboardArrowDown } from '@material-ui/icons';

const useStyles = makeStyles<
  Theme,
  { labelFontColor: string; variant: 'default' | 'dark' }
>((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    width: '20rem',
    maxHeight: '50vh',
    overflowY: 'auto',
    background: ({ variant }) =>
      variant === 'dark' ? theme.palette.primary.dark : 'white',
    color: ({ variant }) =>
      variant === 'default' ? theme.palette.text.primary : 'white',

    '& .MuiTypography-root': {
      color: ({ labelFontColor }) => labelFontColor,
      userSelect: 'none'
    },
    '& .MuiButton-root': {
      color: ({ labelFontColor }) => labelFontColor,
      minWidth: 'auto'
    },
    '& .MuiDivider-root': {
      height: '0.1em'
    },
    '& .MuiDivider-vertical': {
      height: 'auto',
      width: '0.1em',
      margin: '1em'
    },

    '& .hint': {
      color: ({ variant }) =>
        variant === 'default' ? theme.palette.primary.main : 'white'
    }
  }
}));

export function MenuInput({
  id,
  label,
  options,
  insideMenu,
  hint,
  onInput,
  labelFontColor,
  shouldDivideOptions,
  variant = 'default',
  className
}: HorizontalFilterSetInputProps<HorizontalFilterSetMenuInput>) {
  const classes = useStyles({
    labelFontColor: labelFontColor || 'inherit',
    variant
  });

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const toggleMenu: React.MouseEventHandler = useCallback((ev) => {
    setAnchorEl(ev.currentTarget);
    setIsMenuOpen((open) => !open);
  }, []);

  const popoverOrigins: { anchor: PopoverOrigin; transform: PopoverOrigin } =
    useMemo(
      () => ({
        anchor: { horizontal: 'center', vertical: 'top' },
        transform: { horizontal: 'center', vertical: 'bottom' }
      }),
      []
    );

  return (
    <>
      <Button id={`horizontal-filter-set-${id}`} onClick={toggleMenu}>
        {label} <KeyboardArrowDown style={{ marginLeft: '1rem' }} />
      </Button>
      <Popover
        id={`horizontal-filter-set-menu-popover-${id}`}
        className={clsx('horizontal-filter-set-menu-popover', className)}
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={closeMenu}
        PaperProps={{ className: classes.root }}
        anchorOrigin={popoverOrigins.anchor}
        transformOrigin={popoverOrigins.transform}
      >
        {options.map((filter, idx) =>
          renderFilter(
            {
              ...filter,
              data: {
                ...filter.data,
                variant
              }
            } as HorizontalFilterSetFilter,
            idx,
            hint,
            onInput,
            true,
            undefined,
            undefined,
            shouldDivideOptions
          )
        )}
      </Popover>
    </>
  );
}
