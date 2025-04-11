import { useEffect, useState } from 'react';
import { ImageFactor, Position } from '../types';
import { useSyncedState } from '~/hooks/useSyncedState';

type Props = {
  contentRef: React.RefObject<HTMLDivElement>;
  draggableRef: React.RefObject<HTMLDivElement>;
  imageFactor: ImageFactor;
  zoom: number;
};

type ReturnType = {
  position: Position;
  center: Position;
  setCenter: React.Dispatch<React.SetStateAction<Position>>;
};

function useCalcPosition({
  imageFactor,
  zoom,
  draggableRef,
  contentRef
}: Props): ReturnType {
  // center of the map by the map dimension proportion, example: x: 0.5, y: 0.5
  const [center, setCenter] = useSyncedState<Position>(
    'sync-poi-position-factor',
    { x: 0.5, y: 0.5 }
  );
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const contentClientWidth = contentRef.current?.clientWidth || 0;
    const contentClientHeight = contentRef.current?.clientHeight || 0;
    const draggableClientWidth = draggableRef.current?.clientWidth || 0;
    const draggableClientHeight = draggableRef.current?.clientHeight || 0;

    if (!center) return;
    if (!contentClientWidth) return;
    if (!contentClientHeight) return;
    if (!draggableClientHeight) return;
    if (!draggableClientWidth) return;

    const topLimit = imageFactor.height * zoom - 100;
    const leftLimit = imageFactor.width * zoom - 100;

    const x =
      ((center.x * draggableClientWidth) / contentClientWidth - 0.5) * 100;
    const y =
      ((center.y * draggableClientHeight) / contentClientHeight - 0.5) * 100;

    const positionLimit = (value, limit) => Math.max(0, Math.min(value, limit));

    setPosition({
      x: positionLimit(x, leftLimit),
      y: positionLimit(y, topLimit)
    });
  }, [center, zoom]);

  return { position, center, setCenter };
}

export { useCalcPosition };
