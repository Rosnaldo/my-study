import { Box, makeStyles } from '@material-ui/core';
import { useSyncedState } from '~/hooks/useSyncedState';
import { useEffect } from 'react';
import { ImageFloorplan } from '~/components/imag-floorplan';

const useStyles = makeStyles((theme) => ({
  rootFloorplanContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  floorplanContainer: {
    position: 'relative',
    maxHeight: '100%',
    height: '100%',
    width: '100%'
  },

  floorplan: {
    maxHeight: '100%'
  }
}));

const Floorplans: React.FC<{
  floorplans: string[];
  id: string;
  isFullscreen?: boolean;
  onCloseFullscreen?: () => void;
  setExternalCurrentIndex?: (numb: number) => void;
  externalCurrentIndex?: number;
  hideButtons?: boolean;
  isResidence?: boolean;
}> = ({
  floorplans,
  id,
  isFullscreen,
  onCloseFullscreen,
  externalCurrentIndex,
  isResidence = false
}) => {
  const [currentIndex, setcurrentIndex] = useSyncedState(`${id}-index`, 0);
  const classes = useStyles({ isFullscreen, isResidence });

  const fallbackSrc = floorplans[0] || '';

  useEffect(() => {
    if (
      typeof externalCurrentIndex === 'number' &&
      currentIndex !== externalCurrentIndex
    )
      setcurrentIndex(externalCurrentIndex);
  }, [externalCurrentIndex, currentIndex]);

  return (
    <Box className={classes.rootFloorplanContainer}>
      <Box className={classes.floorplanContainer}>
        <ImageFloorplan
          fit="contain"
          className={classes.floorplan}
          src={floorplans[currentIndex] || fallbackSrc}
          thumbnail={floorplans[currentIndex]}
          isFullscreen={isFullscreen}
          isFloorPlan
          onCloseFullscreen={onCloseFullscreen}
        />
      </Box>
    </Box>
  );
};

export default Floorplans;
