import { Box, Typography, makeStyles } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router';
import clsx from 'clsx';
import hLogo from '../assets/211-west/logo-white-acronym.svg';
import menuItems from '~/helpers/menuItems';
import { DevicesList } from './devices-list-cast';
import { useState } from 'react';
import ImageWrapper from './image-wrapper';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    bottom: '0',
    maxHeight: '6vh',
    borderTop: '1px solid #fff',
    backgroundColor: theme.palette.background.paper,
    placeItems: 'center',
    gap: '2em',
    width: '100%'
  },
  menu: {
    display: 'flex',
    height: '100%',
    flex: 3,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: '2rem',
    minWidth: 'max-content'
  },
  logo: {
    height: '6vh',
    width: '4vh',
    cursor: 'pointer'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 300,
    fontSize: '1.25vw',
    padding: '0 1.5rem',

    lineHeight: '44px',
    letterSpacing: '-0.005em',
    textAlign: 'center',
    textTransform: 'uppercase',
    height: '40%',
    cursor: 'pointer',

    '&.MuiTypography-root[data-is-current-page="true"]': {
      textUnderlineOffset: '0.7rem',
      textDecoration: 'underline',
      textDecorationColor: 'white',
      textDecorationThickness: '0.15rem'
    }
  },
  overlay: {
    bottom: '8vh',
    top: '6em',
    height: 'auto',
    width: '100vw',
    zIndex: 20
  },
  controls: {
    display: 'flex',
    borderLeft: '1px solid white',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 2rem'
  },
  selectClient: {
    fontWeight: 600,
    fontSize: '1.25vw',
    textTransform: 'uppercase'
  }
}));

type Props = { className?: string; onClose?: () => void };

const Menu = ({ className, onClose }: Props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickMenuItem = (navigateTo: string) => {
    navigate(navigateTo, { replace: true });
  };

  const [isOpenDevices, setIsOpenDevices] = useState(false);

  const handleToggleDevices = () => setIsOpenDevices(!isOpenDevices);

  const parseLocationName = (navigateLink: string[]) => {
    const path = location.pathname;
    return navigateLink.some((link) => path.includes(link));
  };

  return (
    <>
      <Box className={clsx(className, classes.container)}>
        <Box className={classes.menu}>
          <Box className={classes.logo} onClick={() => navigate('/home')}>
            <ImageWrapper src={hLogo} />
          </Box>
          {menuItems.map((item) => (
            <Box
              key={item.label}
              onClick={() => handleClickMenuItem(item.navigateTo)}
              className={classes.button}
            >
              <Typography
                data-is-current-page={parseLocationName(item.paths)}
                className={classes.button}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className={classes.controls}>
          <DevicesList
            hideDevicesFromName="Test"
            open={isOpenDevices}
            onToggle={handleToggleDevices}
          />
        </Box>
      </Box>
      {onClose && <Box className={classes.overlay} onClick={onClose} />}
    </>
  );
};

export default Menu;
