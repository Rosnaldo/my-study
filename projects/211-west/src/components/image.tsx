import { makeStyles, Modal } from '@evolutionv/vysta-ui';
import { vh } from '~/helpers/style';
import { ExceptCompanion } from './conditionals';
import { Box, Theme } from '@material-ui/core';
import { palette } from '~/providers/theme';
import CloseIcon from './icons/close';
import LazyBackgroundImage from './lazy-background-image';
import { resolveMedia } from '~/helpers/media';
import { ImageFromLocal } from '~/helpers/image-from-local';
import clsx from 'clsx';

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
    objectFit: 'contain',

    outline: 0,

    '&.fullscreen': {
      height: '100vh'
    }
  },
  fullscreenModal: ({ isFloorPlan }) => ({
    height: vh(100),
    width: '100%',
    backgroundColor: isFloorPlan ? palette.floor : 'black',
    cursor: 'pointer'
  }),
  closeButton: {
    position: 'absolute',
    right: '1em',
    top: '1em',
    zIndex: 5000,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: '50%',
    width: '3.5rem',
    height: '3.5rem',

    '& .MuiSvgIcon-root': {
      fontSize: '3.5em'
    }
  }
}));

export function Image({
  disableFullscreen = false,
  isFullscreen,
  onCloseFullscreen,
  fit,
  isFloorPlan = false,
  ...imgProps
}: ImageProps) {
  const { className, onClick, src, thumbnail, ...props } = imgProps;
  const classes = useStyles({ ...imgProps, isFloorPlan });

  const onClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCloseFullscreen?.();
  };

  return (
    <>
      <img
        className={clsx(
          classes.root,
          'SageImage-root',
          { fullscreen: isFullscreen },
          className
        )}
        src={ImageFromLocal ? src : resolveMedia(src!, 1920)}
        onClick={onClick}
      />
      <Modal
        open={!!isFullscreen}
        className={classes.fullscreenModal}
        onClose={onClose}
        hideBackdrop
      >
        <>
          <ExceptCompanion>
            <Box className={classes.closeButton} onClick={onClose}>
              <CloseIcon xcolor="white" />
            </Box>
          </ExceptCompanion>

          <LazyBackgroundImage
            fit={fit}
            placeholderImg={ImageFromLocal ? src : thumbnail}
            src={src!}
          />
        </>
      </Modal>
    </>
  );
}
