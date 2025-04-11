import React, { createContext, PropsWithChildren } from 'react';
import { useCalcPosition } from '~/components/v2-poi/hooks/useCalcPosition';
import { ImageFactor, Position } from '~/components/v2-poi/types';

type Props = {
  contentRef: React.RefObject<HTMLDivElement>;
  draggableRef: React.RefObject<HTMLDivElement>;
  imageFactor: ImageFactor;
  zoom: number;
};

type PositionContextType = {
  contentRef: React.RefObject<HTMLDivElement>;
  draggableRef: React.RefObject<HTMLDivElement>;
  position: Position;
  setCenter: React.Dispatch<React.SetStateAction<Position>>;
  center: Position;
};

const initialContext: PositionContextType = {
  contentRef: { current: null },
  draggableRef: { current: null },
  position: { x: 0, y: 0 },
  setCenter: () => {},
  center: { x: 0, y: 0 }
};

export const PositionContext =
  createContext<PositionContextType>(initialContext);

const Provider: React.FC<PropsWithChildren<Props>> = ({
  contentRef,
  draggableRef,
  children,
  imageFactor,
  zoom
}) => {
  const { position, setCenter, center } = useCalcPosition({
    contentRef,
    draggableRef,
    imageFactor,
    zoom
  });

  const value: PositionContextType = {
    contentRef,
    draggableRef,
    position,
    setCenter,
    center
  };

  return (
    <PositionContext.Provider value={value}>
      {children}
    </PositionContext.Provider>
  );
};

export default Provider;
