import { Box, makeStyles, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { LayoutContext } from '~/providers/layout';
import CloseButton from './close-button';
import logo from '~/assets/211-west/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    marginBottom: '-1em',
    zIndex: 20,
    pointerEvents: 'none',

    '& > *': {
      pointerEvents: 'all'
    },

    '& img': {
      position: 'absolute',
      width: '7.7vw',
      left: '2em',
      marginTop: '2em'
    },

    [theme.breakpoints.up('4k')]: {
      '& img': {
        width: '6vw'
      }
    }
  },
  title: {
    fontFamily: 'Cosmetic',
    color: '#6C6343',
    fontSize: '3.5rem'
  }
}));

type Props = {
  title?: string;
  withBackButton?: boolean;
  noLogo?: boolean;
  onClose?: () => void;
};

const TopNavigation: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { handlers } = useContext(LayoutContext);

  return (
    <Box className={classes.root}>
      {props.noLogo && <Box height="64px" />}
      {!props.noLogo && (
        <img src={logo} alt="211West" onClick={handlers.toggleMenu} />
      )}
      {!!props.title?.length && (
        <Typography className={classes.title}>{props.title}</Typography>
      )}

      <CloseButton onClick={props.onClose} />
    </Box>
  );
};

export default TopNavigation;
