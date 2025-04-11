import { useMemo } from 'react';
import { useSyncedState } from './useSyncedState';

export function useSyncedGallery(
  firstIdx: number,
  galleryLength: number,
  step = 1
) {
  const [currentMediaIndex, setCurrentMediaIndex] = useSyncedState(
    'synced-gallery-state',
    firstIdx
  );

  const controls = useMemo(
    () => ({
      currentMediaIndex,
      updateIndex: setCurrentMediaIndex,
      onNext: () =>
        setCurrentMediaIndex((index) => (index + step) % galleryLength),
      onPrevious: () =>
        setCurrentMediaIndex(
          (index) => (galleryLength + index - step) % galleryLength
        )
    }),
    [setCurrentMediaIndex, currentMediaIndex, galleryLength, firstIdx]
  );

  return controls;
}
