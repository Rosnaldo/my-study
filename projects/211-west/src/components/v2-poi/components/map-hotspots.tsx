import { makeStyles } from '@material-ui/core';
import { Fragment, memo, useContext } from 'react';
import { PoiContext } from '../providers/poi';
import { HotSpotDisplay, TooltipDisplay, Map, MapArea } from '../types';

const useStyles = makeStyles(() => ({
  content: {
    position: 'absolute',
    height: `100%`,
    width: `100%`
  }
}));

type Props = {
  Tooltip: TooltipDisplay;
  HotSpot: HotSpotDisplay;
  map: Map;
  onImageClick: () => void;
  backgroundColor: string;
  openTooltips: string[];
  onHotspotClick: (poiArea: MapArea) => void;
  onHotspotClose: (poiArea: MapArea) => void;
};

const BaseMapAreas = ({
  Tooltip,
  HotSpot,
  map,
  onHotspotClick,
  backgroundColor,
  openTooltips
}: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      {map.areas.map((area) => {
        const { position } = area;

        return (
          <Fragment>
            {openTooltips.includes(area.id) && (
              <Tooltip
                key={`map-tooltip-${area.id}`}
                area={area}
                center={position}
                fill={backgroundColor}
              />
            )}
            <HotSpot
              key={`map-hotspot-${area.id}`}
              letter={area.letter}
              top={position.y}
              left={position.x}
              onMouseEnter={() => onHotspotClick(area)}
              onClick={() => onHotspotClick(area)}
              backgroundColor={backgroundColor}
            />
          </Fragment>
        );
      })}
    </div>
  );
};

export const MemoMapAreas = memo(BaseMapAreas);

export const MapAreas = () => {
  const {
    Tooltip,
    HotSpot,
    map,
    onImageClick,
    backgroundColor,
    openTooltips,
    onHotspotClick,
    onHotspotClose
  } = useContext(PoiContext);

  return (
    <MemoMapAreas
      Tooltip={Tooltip}
      HotSpot={HotSpot}
      map={map}
      onImageClick={onImageClick}
      backgroundColor={backgroundColor}
      openTooltips={openTooltips}
      onHotspotClick={onHotspotClick}
      onHotspotClose={onHotspotClose}
    />
  );
};
