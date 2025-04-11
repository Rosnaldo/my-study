import { makeStyles } from '@material-ui/core';
import { useCallback } from 'react';
import { env } from '~/helpers/env';
import { useContentLoad } from '~/hooks/useContentLoad';
import Splash from '~/components/splash';
import { useContentLoadStore } from '~/store/content-load';
import { SplashScreen } from '@evolutionv/vysta-ui/.build/v2/pages/SplashScreen';

const useStyles = makeStyles((theme) => ({
  logo: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
  },
  background: {
    backgroundColor: theme.palette.background.paper,

    '& > p': {
      color: theme.palette.text.primary,
      textAlign: 'center',
      fontSize: '230%',
      textTransform: 'uppercase',
      position: 'absolute',
      transform: 'translate(0, 250%)'
    }
  }
}));

export default function SplashScreenPage() {
  const classes = useStyles();
  const { updateContent } = useContentLoad();
  const {
    totalDownloadedSize,
    totalToDownload,
    totalToDownloadSize,
    setLoading
  } = useContentLoadStore();

  const handleLoad = useCallback(
    () => updateContent(env.PROPERTY_ID, true),
    []
  );

  const handleLoadEnd = useCallback(() => setLoading(false), []);

  return (
    <SplashScreen
      className={classes.background}
      title={<Splash className={classes.logo} splashScreen />}
      showEstimative={true}
      showLoadingLabel={true}
      showSkipUpdate={!env.IS_COMPANION}
      totalDownloadedSize={totalDownloadedSize}
      totalToDownload={totalToDownload}
      totalToDownloadSize={totalToDownloadSize}
      load={handleLoad}
      onLoadEnd={handleLoadEnd}
    />
  );
}
