import { Box, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import menuItems from '~/helpers/menuItems';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    bottom: '0',
    height: '15vh',
    backgroundColor: theme.palette.background.paper,
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    placeItems: 'center',
    gap: '2rem',
    padding: '0 5rem',
    width: '100%'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #fff',
    color: '#fff',
    fontWeight: 600,
    fontSize: '1.25vw',
    padding: '0 1.5rem',
    minWidth: 'max-content',

    lineHeight: '44px',
    letterSpacing: '-0.005em',
    textAlign: 'center',
    textTransform: 'uppercase',

    height: '30%',
    width: '100%',
    cursor: 'pointer'
  },
  overlay: {
    position: 'absolute',
    bottom: '20vh',
    top: '6em',
    height: 'auto',
    width: '100vw',
    zIndex: 20
  }
}));

type Props = { className?: string; onClose?: () => void };

const MainMenu = ({ className, onClose }: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleClickMenuItem = (navigateTo: string) => {
    navigate(navigateTo, { replace: true });
  };

  return (
    <>
      <Box className={clsx(className, classes.container)}>
        {menuItems.map((item) => (
          <Box
            key={item.label}
            onClick={() => handleClickMenuItem(item.navigateTo)}
            className={classes.button}
          >
            {item.label}
          </Box>
        ))}
      </Box>{' '}
      {onClose && <Box className={classes.overlay} onClick={onClose} />}
    </>
  );
};

export default MainMenu;
