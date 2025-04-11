import { makeStyles, Modal } from '@evolutionv/vysta-ui';
import { vh } from '~/helpers/style';
import { ExceptCompanion } from './conditionals';
import { Box, Theme } from '@material-ui/core';
import { palette } from '~/providers/theme';
import CloseIcon from './icons/close';
import { resolveMedia } from '~/helpers/media';
import ImageWrapper from './image-wrapper';
import { ImageFromLocal } from '~/helpers/image-from-local';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface ImageProps extends ImgProps {
  thumbnail: string;
  fit?: 'cover' | 'contain';
  disableFullscreen?: boolean;
  isFullscreen?: boolean;
  onCloseFullscreen?: () => void;
  isFloorPlan?: boolean;
}

const useStyles = makeStyles<Theme, ImageProps>((theme) => ({
  root: {
    width: ({ width }) => width || '100%',
    height: ({ height }) => height || '100%',

    outline: 0,

    '&.fullscreen': {
      objectFit: 'contain' as 'contain',
      height: '100vh'
    }
  },
  fullscreenModal: ({ isFloorPlan }) => ({
    height: vh(100),
    width: '100%',
    backgroundColor: isFloorPlan
      ? palette.floor
      : theme.palette.background.paper
  }),
  closeButton: {
    position: 'absolute',
    right: '1em',
    top: '1em',
    zIndex: 5000,
    color: 'white',

    '& .MuiSvgIcon-root': {
      fontSize: '3.5em'
    }
  }
}));

export function ImageFloorplan({
  disableFullscreen = false,
  isFullscreen,
  onCloseFullscreen,
  fit,
  isFloorPlan = false,
  ...imgProps
}: ImageProps) {
  const { className, onClick, src, thumbnail } = imgProps;
  const classes = useStyles({ ...imgProps, isFloorPlan });

  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCloseFullscreen?.();
  };

  return (
    <>
      <ImageWrapper
        objectFit="contain"
        src={ImageFromLocal ? src : resolveMedia(src!, 1400)}
      />
      <Modal
        open={!!isFullscreen && !disableFullscreen}
        className={classes.fullscreenModal}
        onClose={onClose}
        hideBackdrop
      >
        <>
          <ExceptCompanion>
            <Box className={classes.closeButton} onClick={onClose}>
              <CloseIcon xcolor={palette.paper} />
            </Box>
          </ExceptCompanion>

          <ImageWrapper objectFit="contain" src={src!} />
        </>
      </Modal>
    </>
  );
}
