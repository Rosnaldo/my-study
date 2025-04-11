import { Box } from '@material-ui/core';
import { useEffect } from 'react';
import { debug } from '~/helpers/debug';
import { env } from '~/helpers/env';

const CompanionOverlay = () => {
  if (!env.IS_COMPANION) {
    return null;
  }

  useEffect(() => {
    return window.electronAPI?.onLog((_, log) => {
      debug(`COMPANION LOG`, log);
    });
  }, []);

  return env.DEBUG ? null : (
    <Box
      height="100vh"
      width="100vw"
      position="fixed"
      top="0"
      left="0"
      zIndex="99999"
    />
  );
};

export default CompanionOverlay;
