import React, { createContext, PropsWithChildren } from 'react';
import { useCalcMap } from '~/components/v2-poi/hooks/useCalcMap';
import {
  HotSpotDisplay,
  ImageFactor,
  Map,
  MapArea,
  TooltipDisplay
} from '~/components/v2-poi/types';
import { useImagefactor } from '../hooks/useImageFactor';

type Props = {
  Tooltip: TooltipDisplay;
  HotSpot: HotSpotDisplay;
  src: string;
  map: Map;
  imgRef: React.RefObject<HTMLImageElement>;
  mainRef: React.RefObject<HTMLDivElement>;
  onImageClick: () => void;
  backgroundColor: string;
  openTooltips: string[];
  onHotspotClick: (area: MapArea) => void;
  onHotspotClose: (area: MapArea) => void;
};

type PoiContextType = {
  Tooltip: TooltipDisplay;
  HotSpot: HotSpotDisplay;
  map: Map;
  onImageClick: () => void;
  backgroundColor: string;
  openTooltips: string[];
  onHotspotClick: (area: MapArea) => void;
  onHotspotClose: (area: MapArea) => void;
  imageFactor: ImageFactor;
};

const InitHotSpot: HotSpotDisplay = () => <div></div>;
const InitTooltip: TooltipDisplay = () => <div></div>;

const initialContext: PoiContextType = {
  Tooltip: InitTooltip,
  HotSpot: InitHotSpot,
  map: {
    areas: []
  },
  onImageClick: () => {},
  backgroundColor: 'black',
  openTooltips: [],
  onHotspotClick: () => {},
  onHotspotClose: () => {},
  imageFactor: { height: 0, width: 0 }
};

export const PoiContext = createContext<PoiContextType>(initialContext);

const Provider: React.FC<PropsWithChildren<Props>> = ({
  children,
  Tooltip,
  HotSpot,
  src,
  map,
  mainRef,
  imgRef,
  onImageClick,
  backgroundColor,
  openTooltips,
  onHotspotClick,
  onHotspotClose
}) => {
  const { map: newMap } = useCalcMap({ map, imgRef });
  const { imageFactor } = useImagefactor({ src, mainRef, imgRef });

  const value: PoiContextType = {
    Tooltip,
    HotSpot,
    map: newMap,
    imageFactor,
    onImageClick,
    backgroundColor,
    openTooltips,
    onHotspotClick,
    onHotspotClose
  };

  return <PoiContext.Provider value={value}>{children}</PoiContext.Provider>;
};

export default Provider;
