import {
  Box,
  InputBase,
  Theme,
  Typography,
  makeStyles
} from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import {
  HorizontalFilterSetInputProps,
  HorizontalFilterSetTextFieldInput
} from '../types';
import SearchIcon from '@material-ui/icons/Search';
import { env } from '~/helpers/env';
import { useFilteredUnits } from '~/hooks/useFilteredUnits';

interface StyleProps {
  disabled: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>(() => ({
  root: {
    '& p': {
      width: 'max-content',
      letterSpacing: '0 !important'
    },
    '& input': {
      pointerEvents: ({ disabled }) => (disabled ? 'none' : 'auto'),
      margin: '0 0.3em !important',
      padding: '0.5em 1em',
      border: 'none !important'
    }
  },
  inputContainer: {
    display: 'flex',
    border: '1px solid #fff',
    borderRadius: '5em',
    height: '2.1rem',
    maxWidth: env.IS_IPAD ? '10rem' : '12rem'
  },
  icon: {
    width: env.IS_IPAD ? '1em !important' : '1.8rem !important',
    height: env.IS_IPAD ? '1em' : '1.8rem',
    padding: '0 0.2em 0 0'
  }
}));

type InputMode =
  | 'none'
  | 'text'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal';

export function TextWithIcon({
  id,
  label,
  insideMenu,
  hint,
  type,
  pattern,
  inputMode,
  disabled = false,
  onClick,
  onInput
}: HorizontalFilterSetInputProps<HorizontalFilterSetTextFieldInput>) {
  const classes = useStyles({ disabled });
  const [value, setValue] = useState('');
  const [{ filters }] = useFilteredUnits();

  useEffect(() => {
    setValue(filters['search-unit']);
  }, [filters['search-unit']]);

  const handleInput = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = ev.target.value.toLocaleUpperCase();
      setValue(newValue);
      onInput(id, newValue);
    },
    [id, onInput]
  );

  return (
    <Box
      id={`horizontal-filter-set-${id}`}
      onClick={() => onClick?.(id)}
      className={classes.root}
    >
      <Typography>{label}</Typography>
      <div className={classes.inputContainer}>
        <InputBase
          value={value}
          onChange={handleInput}
          endAdornment={<SearchIcon className={classes.icon} />}
          type={type}
          inputMode={inputMode as InputMode}
          disabled={disabled}
          inputProps={{
            inputMode: inputMode as InputMode,
            pattern: pattern
          }}
        />
      </div>
    </Box>
  );
}
