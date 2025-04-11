import { useEffect, useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { useGalleries } from './useGalleries';

export type ScreenSaverStore = {
  show: boolean;
  media?: string[];
};

export const screenSaverStore = proxy<ScreenSaverStore>({
  show: false,
  media: []
});

const showScreenSaver = () => {
  screenSaverStore.show = true;
};

const hideScreenSaver = () => {
  screenSaverStore.show = false;
};

const toggleScreenSaver = () => {
  screenSaverStore.show = !screenSaverStore.show;
};

const setScreenSaverMedia = (media: ScreenSaverStore['media']) => {
  screenSaverStore.media = media;
};

export const useScreenSaver = () => {
  const storeSnapshot = useSnapshot(screenSaverStore);
  const galleries = useGalleries();

  useEffect(() => {
    const assets = (galleries?.['Assets']?.['Screen Saver'] || []).map(
      (asset) => asset.url
    );

    setScreenSaverMedia(assets);
  }, [galleries]);

  const context = useMemo(
    () => [
      storeSnapshot,
      {
        showScreenSaver,
        hideScreenSaver,
        toggleScreenSaver,
        setScreenSaverMedia
      }
    ],
    [storeSnapshot]
  );

  return context as [
    ScreenSaverStore,
    {
      showScreenSaver: typeof showScreenSaver;
      hideScreenSaver: typeof hideScreenSaver;
      toggleScreenSaver: typeof toggleScreenSaver;
      setScreenSaverMedia: typeof setScreenSaverMedia;
    }
  ];
};
