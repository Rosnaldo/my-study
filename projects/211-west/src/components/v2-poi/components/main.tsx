import { useCallback, useContext, useMemo, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { HotSpotDisplay, Map, TooltipDisplay } from '../types';
import Draggable from './draggable';
import MapImage from './map-image';
import { MapAreas } from './map-hotspots';
import { MapArea } from '~/components/Hotspot/imageMap';
import PoiProvider, { PoiContext } from '../providers/poi';
import PositionProvider from '../providers/position';
import { useZoom } from '../store/zoom';

type Props = {
  Tooltip: TooltipDisplay;
  HotSpot: HotSpotDisplay;
  url: string;
  map: Map;
  onImageClick: () => void;
  openTooltips: string[];
  onHotspotClick: (poiArea: MapArea) => void;
  onHotspotClose: (poiArea: MapArea) => void;
};

const useStyles = makeStyles(() => ({
  hotspotRoot: {
    width: '100%',
    height: '100%'
  }
}));

function MainPoiMap({
  Tooltip,
  HotSpot,
  url,
  map,
  onImageClick,
  openTooltips,
  onHotspotClick,
  onHotspotClose
}: Props) {
  const classes = useStyles();
  const mainRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const memoOpenTooltips = useMemo(() => openTooltips, [openTooltips]);
  const memoMap = useMemo(() => map, [map]);
  const memoOnImageClick = useCallback(() => onImageClick(), []);
  const memoOnHotspotClick = useCallback((area) => onHotspotClick(area), []);
  const memoOnHotspotClose = useCallback((area) => onHotspotClose(area), []);

  return (
    <div className={classes.hotspotRoot} ref={mainRef}>
      <PoiProvider
        Tooltip={Tooltip}
        HotSpot={HotSpot}
        src={url}
        mainRef={mainRef}
        map={memoMap}
        openTooltips={memoOpenTooltips}
        imgRef={imgRef}
        onImageClick={memoOnImageClick}
        backgroundColor="#001E60"
        onHotspotClick={memoOnHotspotClick}
        onHotspotClose={memoOnHotspotClose}
      >
        <BaseMainPoiMap url={url} mainRef={mainRef} imgRef={imgRef} />
      </PoiProvider>
    </div>
  );
}

type BaseMainPoiMapProps = {
  url: string;
  mainRef: React.RefObject<HTMLDivElement>;
  imgRef: React.RefObject<HTMLImageElement>;
};

function BaseMainPoiMap({ url, imgRef }: BaseMainPoiMapProps) {
  const { imageFactor } = useContext(PoiContext);
  const [{ zoom }] = useZoom();

  const contentRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);
  const memoImageFactor = useMemo(() => imageFactor, [imageFactor]);

  return (
    <PositionProvider
      contentRef={contentRef}
      draggableRef={draggableRef}
      imageFactor={memoImageFactor}
      zoom={zoom}
    >
      <img
        src={url}
        ref={imgRef}
        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
      />
      <ImageWrapper src={url} />
    </PositionProvider>
  );
}

type ImageWrapperProps = {
  src: string;
};

const ImageWrapper = ({ src }: ImageWrapperProps) => {
  return (
    <Draggable>
      <MapImage src={src} />
      <MapAreas />
    </Draggable>
  );
};

export default MainPoiMap;
