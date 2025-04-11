import { ComponentType } from 'react';

export type Position = { x: number; y: number };
export type ImageFactor = { height: number; width: number };

export type MapArea = {
  id: string;
  name: string;
  letter: string;
  category: string;
  position: Position;
  size: number;
};

export type Map = {
  areas: MapArea[];
};

export type HotSpotDisplay = ComponentType<{
  letter: string;
  top: number;
  left: number;
  onMouseEnter: () => void;
  onClick: () => void;
  backgroundColor: string;
}>;

export type TooltipDisplay = ComponentType<{
  area: MapArea;
  center: Position;
  fill: string;
  customContent?: React.ReactNode;
  customPointer?: React.ReactNode;
  popoverWidth?: number;
  popoverHeight?: number;
}>;
