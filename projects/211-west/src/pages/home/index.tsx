import { Box, Button, makeStyles } from '@material-ui/core';
import { useCallback, useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useCompanion } from '~/hooks/useCompanion';
import {
  MediaWithIpadRes,
  getApplicationAssetsGallery,
  useGalleries
} from '~/hooks/useGalleries';
import { LayoutContext } from '~/providers/layout';
import { ExceptCompanion } from '~/components/conditionals';
import { DevicesList } from '~/components/devices-list';
import SettingsDrawer from '~/components/settings-drawer';
import MainMenu from '~/components/main-menu';
import Splash from '~/components/splash';
import { resolveMedia } from '~/helpers/media';
import { env } from '~/helpers/env';

type StyleProps = {
  homeImage: string;
};

const useStyles = makeStyles((theme) => ({
  home: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  container: {
    backgroundImage: ({ homeImage }: StyleProps) => `url('${homeImage}')`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    width: '100%',
    padding: '3em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundSize: 'cover'
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.background.paper,
    opacity: 0.7,

    '& > img': {
      opacity: 1,
      scale: 0.8
    }
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
    '& > div': {
      display: 'flex',
      flexDirection: 'column',
      gap: '2em'
    },
    zIndex: 2
  },
  button: {
    padding: '0.5em 2em',
    fontWeight: 600,
    borderRadius: 0,
    borderColor: theme.palette.common.white,

    '& > span': {
      color: '#fff'
    },

    '&.connected': {
      backgroundColor: 'rgba(213, 213, 213, 0.8)',

      '& > span': {
        color: theme.palette.primary.dark
      }
    }
  },
  devicesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    color: 'white',
    zIndex: 3,
    marginRight: '2rem',

    '& > .MuiButton-contained': {
      color: 'white',
      border: 'solid 1px white',
      backgroundColor: 'transparent'
    }
  },
  menuContainer: {
    zIndex: 10
  }
}));

const Home = () => {
  const galleries = useGalleries();
  const classes = useStyles({
    homeImage: getApplicationAssetsGallery(galleries, 'home')?.url
  });

  const { handlers } = useContext(LayoutContext);
  const [
    { isConnected, physicalConnection },
    { send, disconnectCompanion, disconnectPhysical }
  ] = useCompanion();
  const [isOpenDevices, setIsOpenDevices] = useState(false);

  const handleDisconnect = useCallback(async () => {
    await send('route-change', { pathname: '/home' });
    await send('screensaver-visibility', true);
    await disconnectCompanion();

    if (physicalConnection.deviceId) {
      disconnectPhysical();
    }

    setIsOpenDevices(false);
  }, [send, disconnectCompanion, physicalConnection, disconnectPhysical]);

  const handleToggleDevices = () => setIsOpenDevices(!isOpenDevices);

  useEffect(() => {
    if (galleries && !env.IS_IPAD && !env.IS_COMPANION) {
      const media = Object.entries(galleries!)
        .filter(([k]) => !['floorplans', 'Floorplan', 'Keyplans'].includes(k))
        .map(([_, v]) => v)
        .map((gallery) => Object.values(gallery).flat())
        .flat() as Array<MediaWithIpadRes>;

      for (let i = 0; i < media.length; i++) {
        const img = new Image();
        img.src = resolveMedia(media[i].url, 256);
      }
    }
  }, [galleries]);

  return (
    <Box className={classes.home}>
      <Box className={classes.container}>
        <Box className={classes.backgroundOverlay}>
          <Splash variant="white" />
        </Box>

        <ExceptCompanion>
          <Box className={classes.buttonsContainer}>
            <div>
              <Button
                className={clsx(classes.button, { connected: isConnected })}
                variant="outlined"
                onClick={isConnected ? handleDisconnect : handleToggleDevices}
              >
                {isConnected ? 'Disconnect' : 'Connect'}
              </Button>

              <Button
                className={classes.button}
                variant="outlined"
                onClick={handlers.toggleSettings}
              >
                Settings
              </Button>
            </div>
            <DevicesList
              hideDevicesFromName="Test"
              open={isOpenDevices}
              onToggle={handleToggleDevices}
              className={classes.devicesContainer}
            />
          </Box>
        </ExceptCompanion>
      </Box>
      <ExceptCompanion>
        <MainMenu className={classes.menuContainer} />
        <SettingsDrawer />
      </ExceptCompanion>
    </Box>
  );
};

export default Home;
