import { Box, IconButton, makeStyles } from '@evolutionv/vysta-ui';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import { Theme } from '@material-ui/core';

type ArrowProps = {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
  small?: boolean;
};

type ThemeProps = {
  small: boolean;
};

const useStyles = makeStyles<Theme, ThemeProps>((theme) => ({
  box: {
    position: 'relative',
    width: '1.5em'
  },
  arrow: {
    zIndex: 2,
    background: '#fff',
    borderRadius: '100%',
    height: 'fit-content',
    color: '#001E60',
    position: 'absolute',
    top: '40%',
    transform: ({ small }) => (small ? '' : 'translate(0%, -70%)'),
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.1em 0.2em',
    '-webkit-box-shadow': '1px 1px 10px 0px rgba(0,0,0,0.5)',
    '-moz-box-shadow': '1px 1px 10px 0px rgba(0,0,0,0.5)',
    boxShadow: '1px 1px 10px 0px rgba(0,0,0,0.5)',

    '&:hover': {
      background: '#fff'
    },

    '&.left': {
      left: 0
    },
    '&.right': {
      right: 0
    },

    '& svg': {
      width: ({ small }) => (small ? '1em' : '2em'),
      height: ({ small }) => (small ? '1em' : '2em')
    }
  }
}));

export const Arrow = ({
  direction,
  disabled,
  onClick,
  small = false
}: ArrowProps) => {
  const classes = useStyles({ small });

  return (
    <Box className={classes.box}>
      <button
        className={clsx(classes.arrow, direction)}
        disabled={disabled}
        onClick={onClick}
      >
        {direction === 'right' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
    </Box>
  );
};
