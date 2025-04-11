import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import {
  HorizontalFilterSetInputProps,
  HorizontalFilterSetLabelInput
} from '../types';
import Formatter from '~/helpers/formatter';

interface StyleProps {
  insideMenu: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: ({ insideMenu }: StyleProps) =>
      insideMenu ? 'column nowrap' : 'row nowrap',
    alignItems: 'center',
    margin: `1rem .5rem !important`
  },
  label: {
    margin: ({ insideMenu }: StyleProps) => (insideMenu ? '0.5em' : 'auto'),
    flex: ({ insideMenu }: StyleProps) => (insideMenu ? '1 0 100%' : '1 1')
  }
}));

export function LabelInput({
  insideMenu,
  label
}: HorizontalFilterSetInputProps<HorizontalFilterSetLabelInput>) {
  const classes = useStyles({ insideMenu });

  return (
    <Box
      className={clsx('horizontal-filter-set-label', classes.root)}
      id={`horizontal-filter-set-${Formatter.slugify(label)}`}
    >
      <Typography
        className={clsx('horizontal-filter-set-value', classes.label)}
      >
        {label}
      </Typography>
      {insideMenu && <Divider flexItem />}
    </Box>
  );
}
