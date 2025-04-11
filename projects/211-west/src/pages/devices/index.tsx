import { Header } from '@evolutionv/vysta-ui/.build/v2/layout/header';
import { Layout } from '@evolutionv/vysta-ui/.build/v2/layout/layout';
import { Button, Box, makeStyles } from '@evolutionv/vysta-ui';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { DevicesList } from '~/components/devices-list';
import { useCompanion } from '~/hooks/useCompanion';
import { transition } from '~/helpers/style';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#ffffff',
    color: '#001E60000'
  },
  header: {
    height: '8em',
    padding: '1em'
  },
  backContainer: {
    width: '100%',
    margin: '0 auto',
    maxWidth: '1000px',
    display: 'flex',
    justifyContent: 'flex-start',

    '& > .MuiButton-root': {
      fontSize: '0.75em'
    }
  },
  devicesContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.5em',
    gap: '1em',

    '& > .MuiButton-root': {
      isolation: 'isolate',
      backgroundColor: 'transparent',
      color: '#001E60',
      border: '1px solid #aaaaaa',
      padding: '1em 2em',
      width: '100%',
      maxWidth: '1000px',

      '&.no-devices': {
        border: 'none'
      },

      '&.connected': {
        color: theme.palette.primary.dark
      }
    }
  },
  disconnectContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.5em',
    transition: transition('all'),

    '& > .MuiButton-root': {
      width: '100%',
      maxWidth: '1000px',
      padding: '1em 2em'
    }
  }
}));

const Devices = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [
    { isConnected, physicalConnection },
    { send, disconnectCompanion, disconnectPhysical }
  ] = useCompanion();

  const handleBack = useCallback(() => {
    if (history.length > 1) {
      return navigate(-1);
    }

    navigate('/home');
  }, [history]);

  const handleDisconnect = useCallback(async () => {
    await send('route-change', { pathname: '/home' });
    await send('screensaver-visibility', true);
    await disconnectCompanion();

    if (physicalConnection.deviceId) {
      disconnectPhysical();
    }
  }, [send, disconnectCompanion, physicalConnection, disconnectPhysical]);

  return (
    <Layout
      header={
        <Header title="Devices" className={classes.header}>
          <Box className={classes.backContainer}>
            <Button onClick={handleBack} variant="outlined">
              Back
            </Button>
          </Box>
        </Header>
      }
      className={classes.root}
    >
      <DevicesList open className={classes.devicesContainer} />

      {isConnected && (
        <Box className={classes.disconnectContainer}>
          <Button onClick={handleDisconnect}>Disconnect</Button>
        </Box>
      )}
    </Layout>
  );
};

export default Devices;
