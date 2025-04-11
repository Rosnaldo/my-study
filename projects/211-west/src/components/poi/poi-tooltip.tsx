import { makeStyles } from '@evolutionv/vysta-ui';
import { HotspotMap } from '~/api';
import { MapArea } from '~/helpers/minimap';
import { Media } from '~/hooks/useGalleries';
import { useSyncedGallery } from '~/hooks/useSyncedGallery';
import clsx from 'clsx';
import { env } from '~/helpers/env';
import { parseTags } from '.';
import { useEffect } from 'react';
import { POIModalProps } from '~/hooks/useHotspots';
import { Position } from '../v2-poi/types';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    padding: '0.6vh 0.3vw',
    background: theme.palette.background.paper,
    border: 'none',

    '& span': {
      color: theme.palette.common.white
    }
  },
  arrowWrapper: {
    position: 'absolute',
    flexDirection: 'row',
    whiteSpace: 'nowrap',
    top: '14vh',
    left: 0,
    width: '100%',
    bottom: 0,

    '&.show': {
      display: 'flex'
    },
    display: 'none'
  },
  arrowContainer: {
    display: 'block',
    width: '50%',
    height: '100%'
  },
  arrow: {
    position: 'absolute',
    top: 0,
    fontSize: '2.2em',
    color: theme.palette.background.paper,
    '&.left': {
      left: 0
    },
    '&.right': {
      right: 0
    }
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    lineHeight: '1em',
    padding: '1rem 0',

    '& > p': {
      textAlign: 'center',
      fontSize: '1rem',
      textTransform: 'capitalize',
      margin: 0,
      fontWeight: 300,
      transform: 'translateY(0.2rem)'
    },

    '&.withoutImage p:first-child': {
      margin: 0
    },

    '& > p:nth-child(2)': {
      color: theme.palette.background.paper
    },

    '& > p:nth-child(3), > p:nth-child(4)': {
      fontSize: '0.8em',
      width: '100%',
      textAlign: 'center',
      fontWeight: 300
    },

    '& .stars-container': {
      display: 'flex',
      flexDirection: 'row',
      height: '1.5em',
      fontSize: '0.8em',
      justifyContent: 'start',
      alignItems: 'center',
      '& > span': {
        lineHeight: '0.8em'
      }
    }
  },
  image: {
    width: '100%',
    height: '14vh !important',
    objectFit: 'cover'
  }
}));

const CustomTooltipContent: React.FC<{
  medias: Media[];
  area: HotspotMap;
  setModal: (props: POIModalProps) => void;
}> = ({ medias, area, setModal }) => {
  const classes = useStyles();

  const { currentMediaIndex, onNext, onPrevious, updateIndex } =
    useSyncedGallery(0, medias.length);

  useEffect(() => {
    updateIndex(0);
  }, [medias]);

  const { type, distance, time } = parseTags(area.tag || '');

  return (
    <div className={classes.container} data-cy="hotspot-info">
      {medias[currentMediaIndex]?.url && (
        <img
          className={classes.image}
          src={medias[currentMediaIndex]?.url}
          alt={medias[currentMediaIndex]?.title}
          onClick={() =>
            setModal({
              open: true,
              area,
              mediaSrc: medias[currentMediaIndex]?.id
            })
          }
        />
      )}

      <div
        className={clsx(classes.arrowWrapper, {
          show: !env.IS_COMPANION && medias.length > 1
        })}
      >
        <span className={classes.arrowContainer} onClick={onPrevious}>
          &#8205;
        </span>
        <span className={classes.arrowContainer} onClick={onNext}>
          &#8205;
        </span>
      </div>

      <div
        className={clsx(classes.info, {
          withoutImage: !medias[currentMediaIndex]?.url
        })}
      >
        <p>{area.name.toLocaleUpperCase()}</p>
        <p>{type}</p>
        <p>{distance}</p>
        <p>{time}</p>
      </div>
    </div>
  );
};

export const getTooltipMapper =
  (
    updateArea: (id: string, center: Position) => void,
    show: boolean,
    area: HotspotMap,
    setOpenModal: (id: string) => void,
    setTooltip: (id: string, value: boolean) => void,
    medias: Media[],
    setModal: (props: POIModalProps) => void
  ) =>
  (poiArea: MapArea, center: Position) => {
    // generate the props for the tooltip and save the area center
    updateArea(poiArea.id, center);

    return {
      show,
      description: area.descriptionPopUp || '',
      onClick: () => setOpenModal(poiArea.id),
      onClose: () => setTooltip(poiArea.id, false),
      customContent: (
        <CustomTooltipContent medias={medias} area={area} setModal={setModal} />
      )
    };
  };

export default CustomTooltipContent;
