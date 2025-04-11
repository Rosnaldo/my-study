import { makeStyles } from '@material-ui/core';
import { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { env } from '~/helpers/env';
import { useCache } from '~/hooks/useCache';
import { CacheKeys } from '~/hooks/useCache/keys';
import { useCompanion } from '~/hooks/useCompanion';
import { useContentLoad } from '~/hooks/useContentLoad';
import { useScreenSaver } from '~/hooks/useScreenSaver';
import { LayoutContext } from '~/providers/layout';
import { ConnectIcon } from '~/components/icons';
import { SettingsDrawer as SettingsDrawerComponent } from './view';
import AutorenewIcon from '../icons/autorenew';
import PersonalVideoIcon from '../icons/personal-video';
import ExitToAppIcon from '../icons/exit-to-app';

const useStyles = makeStyles((theme) => ({
  root: {}
}));

const SettingsDrawer = () => {
  const { state, handlers } = useContext(LayoutContext);
  const navigate = useNavigate();
  const classes = useStyles();
  const [, { send }] = useCompanion();
  const { updateContent } = useContentLoad();
  const [, setAccessToken] = useCache<string>(CacheKeys.ACCESS_TOKEN);
  const [, { showScreenSaver }] = useScreenSaver();

  const handleDataUpdate = useCallback(() => {
    updateContent(env.PROPERTY_ID, true);
    send('content::update');
  }, []);

  const handleScreenPairClick = useCallback(() => {
    navigate('/devices');
  }, []);

  const handleAgentLogout = useCallback(() => {
    setAccessToken(null);
  }, []);

  const options = useMemo(
    () => [
      [
        {
          icon: <AutorenewIcon />,
          label: 'Data Update',
          onClick: handleDataUpdate
        },
        {
          icon: <ConnectIcon style={{ fill: 'transparent' }} />,
          label: 'Screen Pair',
          onClick: handleScreenPairClick
        }
      ],
      [
        {
          icon: <PersonalVideoIcon />,
          label: 'Screen Saver Mode',
          onClick: showScreenSaver
        },
        {
          icon: <ExitToAppIcon />,
          label: 'Agent Log Out',
          onClick: handleAgentLogout
        }
      ]
    ],
    []
  );

  return (
    <SettingsDrawerComponent
      open={state.isSettingsOpen}
      onClose={handlers.toggleSettings}
      options={options}
    />
  );
};

export default SettingsDrawer;
