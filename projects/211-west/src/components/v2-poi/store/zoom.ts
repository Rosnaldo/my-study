import { useEffect, useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { env } from '~/helpers/env';
import { useCompanion } from '~/hooks/useCompanion';

type IZoomStore = {
  zoom: number;
  zoomed: boolean;
};
// HOOK

export const zoomStore = proxy<IZoomStore>({
  zoom: 1,
  zoomed: false
});

const setZoomed = (newZoomed: boolean) => {
  zoomStore.zoomed = newZoomed;
};

export function useZoom() {
  const storeSnapshot = useSnapshot(zoomStore);
  const [{ isConnected }, { on, send }] = useCompanion();

  // IPAD ONLY update companion zoomed
  useEffect(() => {
    if (env.IS_COMPANION || !isConnected) return;
    send('poi-zoom:zoomed', storeSnapshot.zoomed);
  }, [storeSnapshot.zoomed]);

  // COMPANION ONLY update companion zoomed
  useEffect(() => {
    if (!env.IS_COMPANION) return;
    return on('poi-zoom:zoomed', (_, zoomed: boolean) => {
      zoomStore.zoomed = zoomed;
    });
  }, []);

  // update units
  useEffect(() => {
    const zoomed = storeSnapshot.zoomed;
    zoomStore.zoom = zoomed ? 2 : 1;
  }, [storeSnapshot.zoomed]);

  // MEMOIZE STORE AND FUNCTIONS INTO A CONTEXT
  const context = useMemo(
    () => [
      storeSnapshot,
      {
        setZoomed
      }
    ],
    [storeSnapshot]
  );

  return context as [
    IZoomStore,
    {
      setZoomed: typeof setZoomed;
    }
  ];
}
