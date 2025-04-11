import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import {
  HorizontalFilterSetInputProps,
  HorizontalFilterSetMultiOptionInput
} from '../types';

interface StyleProps {
  insideMenu: boolean;
  columnsNum: number;
  variant: 'default' | 'dark';
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: ({ insideMenu }: StyleProps) =>
      insideMenu ? 'column nowrap' : 'row nowrap',
    alignItems: 'center'
  },
  label: {
    margin: ({ insideMenu }: StyleProps) => (insideMenu ? '0.5em' : 'auto'),
    flex: ({ insideMenu }: StyleProps) => (insideMenu ? '1 0 100%' : 0)
  },
  optionContainer: ({ insideMenu, columnsNum }: StyleProps) =>
    insideMenu
      ? {
          justifyContent: 'space-evenly',
          width: '100%',
          overflowX: 'auto',
          display: 'inline-grid',
          gridTemplateColumns: `repeat(${columnsNum}, 1fr)`
        }
      : {
          display: 'flex',
          flexFlow: 'row nowrap',
          width: 'auto',
          overflowX: 'hidden',
          padding: '0 0.5em'
        },
  option: ({ insideMenu, variant }: StyleProps) =>
    insideMenu
      ? {
          padding: 0,
          height: '6em',
          minWidth: '4em',
          margin: '0.5em',
          position: 'relative',

          '& .MuiButton-label': {
            marginTop: '3.5em'
          },

          '&:before': {
            content: '""',
            position: 'absolute',
            top: '0.5em',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '2em',
            width: '2em',
            borderRadius: '50%',
            border: `0.3em solid ${theme.palette.background.paper}`
          },
          '&.hint:before': {
            background:
              variant === 'default' ? theme.palette.primary.main : 'white'
          },

          '&:after': {
            content: '""',
            position: 'absolute',
            top: '0.3em',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '2.5em',
            width: '2.5em',
            borderRadius: '50%',
            border: `0.2em solid ${theme.palette.background.default}`
          },
          '&.hint:after': {
            borderColor:
              variant === 'default' ? theme.palette.primary.main : 'white'
          }
        }
      : {
          borderRadius: '50%',
          padding: 0,
          height: '4em',
          width: '4em',
          margin: '0 0.5em'
        }
}));

export function MultiOptionInput({
  id,
  insideMenu,
  label,
  options,
  hint,
  onInput,
  disabled = false,
  shouldDivideOptions = true,
  variant = 'default',
  className
}: HorizontalFilterSetInputProps<HorizontalFilterSetMultiOptionInput>) {
  const classes = useStyles({
    insideMenu,
    columnsNum: options.length,
    variant
  });
  return (
    <Box
      className={clsx(
        'horizontal-filter-set-multi-option',
        classes.root,
        className
      )}
      id={`horizontal-filter-set-${id}`}
      data-cy={`${id}-filter`}
    >
      <Typography
        className={clsx(
          'horizontal-filter-set-multi-option-label',
          classes.label
        )}
      >
        {label}
      </Typography>
      {insideMenu && shouldDivideOptions && <Divider flexItem />}
      <Box
        className={clsx(
          'horizontal-filter-set-multi-option-container',
          classes.optionContainer
        )}
      >
        {options.map((option) => (
          <Button
            className={`${classes.option} ${
              hint.includes(`${id}__${option.value}`) ? 'hint' : ''
            }`}
            value={option.value}
            variant="text"
            key={`horizontal-filter-set-${id}-${option.value}`}
            onClick={() => onInput(id, option.value)}
            disabled={disabled}
            data-cy={`${id}-option-button`}
          >
            {option.label || `${option.value}`}
          </Button>
        ))}
      </Box>
      {insideMenu && <Divider flexItem />}
    </Box>
  );
}
