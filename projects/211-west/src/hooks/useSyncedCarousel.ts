import { useCallback, useMemo } from 'react';
import { useSyncedState } from './useSyncedState';
import { MediaWithIpadRes } from '~/hooks/useGalleries';

type Props = {
  firstIndex: number;
  media: MediaWithIpadRes[];
};

export function useSyncedCarousel({ firstIndex, media }: Props) {
  const [currentMediaIndex, setCurrentMediaIndex] = useSyncedState(
    'synced-carousel-state',
    firstIndex
  );

  const handleNext = useCallback(() => {
    const step = 1;
    let nextIndex = (currentMediaIndex + step) % media.length;
    setCurrentMediaIndex(nextIndex);
  }, [media, currentMediaIndex]);

  const handlePrevious = useCallback(() => {
    const step = 1;
    let nextIndex = (media.length + currentMediaIndex - step) % media.length;
    setCurrentMediaIndex(nextIndex);
  }, [media, currentMediaIndex]);

  const controls = useMemo(
    () => ({
      currentMediaIndex,
      updateIndex: setCurrentMediaIndex,
      onNext: handleNext,
      onPrevious: handlePrevious
    }),
    [setCurrentMediaIndex, currentMediaIndex, handleNext, handlePrevious]
  );

  return controls;
}
