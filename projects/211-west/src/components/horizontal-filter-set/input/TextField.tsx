import { Box, Divider, InputBase, makeStyles } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  HorizontalFilterSetInputProps,
  HorizontalFilterSetTextFieldInput
} from '../types';

interface StyleProps {
  insideMenu: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: ({ insideMenu }: StyleProps) =>
      insideMenu ? 'column nowrap' : 'row nowrap',
    alignItems: 'center'
  },
  textField: {
    height: ({ insideMenu }: StyleProps) => (insideMenu ? 'auto' : '100%'),
    width: ({ insideMenu }: StyleProps) => (insideMenu ? '100%' : '5em'),
    margin: ({ insideMenu }: StyleProps) => (insideMenu ? '0.5em' : '0'),
    flex: ({ insideMenu }: StyleProps) => (insideMenu ? '1 0 100%' : 'auto'),

    '&>.MuiInputBase-input': {
      height: '100%',
      padding: '0.5em 0.75em'
    }
  }
}));

export function TextFieldInput({
  id,
  insideMenu,
  hint,
  onInput
}: HorizontalFilterSetInputProps<HorizontalFilterSetTextFieldInput>) {
  const classes = useStyles({ insideMenu });
  const [value, setValue] = useState(
    hint.find((hint) => hint.startsWith(`${id}__`))?.replace(`${id}__`, '') ||
      ''
  );

  const handleInput = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setValue(ev.target.value);
      onInput(id, ev.target.value);
    },
    [id, onInput]
  );

  useEffect(() => {
    setValue(
      hint.find((hint) => hint.startsWith(`${id}__`))?.replace(`${id}__`, '') ||
        ''
    );
  }, [hint]);

  return (
    <Box
      className={clsx('horizontal-filter-set-text-field', classes.root)}
      id={`horizontal-filter-set-${id}`}
      data-cy={`filter-${id}-input`}
    >
      <InputBase
        className={classes.textField}
        value={value}
        onChange={handleInput}
      />
      {insideMenu && <Divider flexItem />}
    </Box>
  );
}
