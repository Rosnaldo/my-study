import { useEffect } from 'react';
import { env } from '~/helpers/env';
import { useCompanion } from '~/hooks/useCompanion';
import { useContentLoad } from '~/hooks/useContentLoad';
import { useContentLoadStore } from '~/store/content-load';

const _24_HOURS_IN_MILISECONDS = 1000 * 60 * 60 * 24;

const ContentUpdater = () => {
  const { updateContent } = useContentLoad();
  const { loading } = useContentLoadStore();
  const [{}, { on }] = useCompanion();

  // COMPANION ONLY
  useEffect(() => {
    if (!env.IS_COMPANION) return;

    const unsubscribeContentUpdate = on('content::update', () => {
      updateContent(env.PROPERTY_ID, true);
    });

    return () => {
      unsubscribeContentUpdate();
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    const updateContentInterval = setInterval(() => {
      updateContent(env.PROPERTY_ID, false);
    }, _24_HOURS_IN_MILISECONDS);

    return () => {
      clearInterval(updateContentInterval);
    };
  }, [loading]);

  return null;
};

export default ContentUpdater;
