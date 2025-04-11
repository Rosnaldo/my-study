import { Position } from '../v2-poi/types';

export type TooltipMapper = (
  area: MapArea,
  center: Position
) => {
  show: boolean;
  onClick: () => void;
  onClose: () => void;
  onExpand?: () => void;
  description?: string;
  customContent?: React.ReactNode;
  customPointer?: React.ReactNode;
};

export interface MapArea {
  id: string;
  coords: number[];
  href: string;
  category: string;
  tooltipMapper?: TooltipMapper;
}

export interface ImageMap {
  name: string;
  areas: MapArea[];
}
