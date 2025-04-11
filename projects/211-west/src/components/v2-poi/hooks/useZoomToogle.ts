import { useCallback } from 'react';
import { Position } from '../types';
import { useDoubleClick } from './useDoubleClick';
import { calcEpageXY } from '../helpers/calcEpage';
import { useZoom } from '../store/zoom';
import { calcEoffsetXY } from '../helpers/calcEOffset';

type Props = {
  contentRef: React.RefObject<HTMLDivElement>;
  draggableRef: React.RefObject<HTMLDivElement>;
  setCenter: React.Dispatch<React.SetStateAction<Position>>;
};

function useZoomToogle({ contentRef, draggableRef, setCenter }: Props) {
  const [{ zoomed }, { setZoomed }] = useZoom();

  const zoomIn = (e) => {
    zoomInPosition(e);
    setZoomed(true);
  };
  const zoomOut = () => {
    setZoomed(false);
  };
  const zoomInPosition = useCallback((e) => {
    const draggable = draggableRef.current;
    if (!draggable) return;

    const clientRect = draggable.getBoundingClientRect();
    const { offsetX, offsetY } = calcEoffsetXY(e);
    //calc container proportion, example: 20%, 50%

    const xFactor = offsetX / clientRect.width;
    const yFactor = offsetY / clientRect.height;

    setCenter({ x: xFactor, y: yFactor });
  }, []);

  const handleDoubleClick = useCallback(
    (e) => {
      if (zoomed) {
        zoomOut();
      } else {
        zoomIn(e);
      }
    },
    [zoomOut, zoomIn, zoomed]
  );

  useDoubleClick({ contentRef, handleDoubleClick });
}

export { useZoomToogle };
