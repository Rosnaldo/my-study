import { Box, Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useQueryString } from '~/hooks/useQueryString';

const options: Array<{
  option: 'list' | 'compare' | 'lighting';
  navigateTo: string;
  label?: string;
}> = [
  { option: 'list', navigateTo: '/residences?view=list', label: 'unit list' },
  { option: 'compare', navigateTo: '/compare' },
  { option: 'lighting', navigateTo: '/' }
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.4vh',
    padding: '0 2rem'
  },
  button: {
    textTransform: 'uppercase',
    padding: '0.5em 2em',
    background: 'white',
    color: theme.palette.background.paper,
    border: `solid 1px ${theme.palette.background.paper}`
  },
  buttonActive: {
    '&:hover': {
      background: '#001E60'
    },
    border: 'none',
    background: theme.palette.background.paper,
    color: '#FFF'
  }
}));

const shouldBeActive = (
  currentView: 'list' | 'lighting' | undefined,
  option: string,
  locationHash: string
) =>
  currentView === option ||
  (option === 'compare' && locationHash.includes('compare')) ||
  (!currentView && option === 'list' && locationHash.includes('residences'));

export const Sidebar = () => {
  const locationHash = window.location.hash;
  const [query] = useQueryString<{ view?: 'list' | 'lighting' }>({});

  const classes = useStyles();

  const navigate = useNavigate();

  const handleClick = (option: typeof options[0]) => () => {
    navigate(option.navigateTo, { replace: true });
  };

  return useMemo(
    () => (
      <Box className={classes.root}>
        {options.map((option) => (
          <Button
            key={option.option}
            onClick={handleClick(option)}
            className={clsx(classes.button, {
              [classes.buttonActive]: shouldBeActive(
                query.view,
                option.option,
                locationHash
              )
            })}
          >
            {option.label || option.option}
          </Button>
        ))}
      </Box>
    ),
    [locationHash]
  );
};
