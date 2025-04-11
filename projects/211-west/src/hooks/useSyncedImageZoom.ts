import { useCallback, useMemo } from 'react';
import { useSyncedState } from '~/hooks/useSyncedState';

export interface ZoomState {
  scale: number;
  positionX: number;
  positionY: number;
  windowWidth: number;
  windowHeight: number;
}

export function useSyncedImageZoom() {
  const [zoomState, setZoomState] = useSyncedState<ZoomState>(
    'image-zoom::set',
    {
      positionX: 0,
      positionY: 0,
      scale: 1,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    }
  );

  const handleSetZoom = useCallback((newState: ZoomState) => {
    setZoomState({
      ...newState,
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth
    });
  }, []);

  const controls = useMemo(
    () => ({ zoomState, setZoomState: handleSetZoom }),
    [handleSetZoom, zoomState]
  );

  return controls;
}
