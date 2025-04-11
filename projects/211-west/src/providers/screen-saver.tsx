import { useEffect } from 'react';
import { env } from '~/helpers/env';
import { useCompanion } from '~/hooks/useCompanion';
import { useScreenSaver } from '~/hooks/useScreenSaver';
import { ScreenSaver } from '~/components/screen-saver';
import { useContentLoadStore } from '~/store/content-load';

const SLIDE_INTERVAL = 5_000;

const ScreenSaverProvider: React.FC = ({ children }) => {
  const { loading } = useContentLoadStore();
  const [{ show }, { hideScreenSaver, showScreenSaver }] = useScreenSaver();
  const [{}, { on, send }] = useCompanion();

  // COMPANION ONLY shows screensaver when not loading data
  useEffect(() => {
    if (env.IS_COMPANION && !loading) {
      showScreenSaver();
    }
  }, [loading]);

  // IPAD ONLY send changes to companion
  useEffect(() => {
    if (env.IS_COMPANION) return;
    send('screensaver-visibility', show);
  }, [show]);

  // COMPANION ONLY listen to changes from ipad
  useEffect(() => {
    if (!env.IS_COMPANION) return;
    return on('screensaver-visibility', (_, show: boolean) => {
      if (show) showScreenSaver();
      else hideScreenSaver();
    });
  }, []);

  return (
    <>
      {children}
      {env.IS_COMPANION && show && (
        <ScreenSaver slideInterval={SLIDE_INTERVAL} />
      )}
    </>
  );
};

export default ScreenSaverProvider;
