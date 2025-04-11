import { useCallback, useState } from 'react';
import { ImageFactor, Position } from '../types';
import { calcEpageXY } from '../helpers/calcEpage';
import { useInitMouseDown } from './useInitMouseDown';
import { useInitMouseUp } from './useInitMouseUp';
import { useInitMouseMove } from './useInitMouseMove';
import { useInitMouseLeave } from './useInitMouseLeave';

type Props = {
  contentRef: React.RefObject<HTMLDivElement>;
  draggableRef: React.RefObject<HTMLDivElement>;
  setCenter: React.Dispatch<React.SetStateAction<Position>>;
  position: Position;
  imageFactor: ImageFactor;
  zoom: number;
};

function useDrag({
  contentRef,
  draggableRef,
  position,
  setCenter,
  imageFactor,
  zoom
}: Props) {
  const fps = 60;
  const [lastMove, setLastMove] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const topLimit = imageFactor.height * zoom - 100;
  const leftLimit = imageFactor.width * zoom - 100;

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const draggable = draggableRef.current;
    if (!draggable) return;

    const { pageX, pageY } = calcEpageXY(e);

    const clientRect = draggable.getBoundingClientRect();

    setIsDown(true);
    setStartX(pageX - clientRect.left);
    setStartY(pageY - clientRect.top);
  }, []);

  const movePosition = useCallback(
    (e) => {
      requestAnimationFrame(() => {
        e.preventDefault();
        e.stopPropagation();
        
        const content = contentRef.current;
        const draggable = draggableRef.current;
        if (!content) return;
        if (!draggable) return;
        if (!isDown) return;
        
        const velocityFactor = 1.5;
        const clientRect = draggable.getBoundingClientRect();
        const { pageX, pageY } = calcEpageXY(e);
    
        const endX = pageX - clientRect.left;
        const endY = pageY - clientRect.top;
    
        const walkX = startX - endX;
        const walkY = startY - endY;
    
        const x = (walkX / clientRect.width) * 100 * velocityFactor;
        const y = (walkY / clientRect.height) * 100 * velocityFactor;
    
        const positionX = position.x + x;
        const positionY = position.y + y;
    
        const positionLimit = (value, limit) =>
          Math.max(0, Math.min(value, limit));
    
        const newPositionX = positionLimit(positionX, leftLimit);
        const newPositionY = positionLimit(positionY, topLimit);
    
        const centerX =
          (newPositionX / 100 + 0.5) *
          (content.clientWidth / draggable.clientWidth);
        const centerY =
          (newPositionY / 100 + 0.5) *
          (content.clientHeight / draggable.clientHeight);
    
        setCenter({
          x: leftLimit === 0 ? 0 : centerX,
          y: topLimit === 0 ? 0 : centerY
        });
    });

    },
    [isDown, startX, startY, position, zoom]
  );

  const handleMouseMove = (e) => {
    const now = Date.now();
    if (now - lastMove >= 1000 / fps) {
      movePosition(e);
      setLastMove(now);
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDown(false);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDown(false);
  };

  useInitMouseDown({ contentRef: draggableRef, handleMouseDown });
  useInitMouseUp({ contentRef: draggableRef, handleMouseUp });
  useInitMouseMove({ contentRef: draggableRef, handleMouseMove });
  useInitMouseLeave({ contentRef: draggableRef, handleMouseLeave });
}

export { useDrag };
