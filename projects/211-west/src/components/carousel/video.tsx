import { Box, makeStyles, Modal } from '@evolutionv/vysta-ui';
import {
  VideoMedia,
  VideoMediaProps
} from '@evolutionv/vysta-ui/.build/v2/components/Gallery/Media/VideoMedia';
import clsx from 'clsx';
import { vh } from '~/helpers/style';

export interface VideoProps
  extends React.ImgHTMLAttributes<HTMLVideoElement>,
    Omit<VideoMediaProps, 'src'> {
  fit?: 'cover' | 'contain';
  isFullscreen?: boolean;
  onCloseFullscreen?: () => void;
  thumbnailSrc?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    outline: 0,
    background: '#000',

    '&.fullscreen': {
      objectFit: 'contain'
    },

    '& .VystaGalleryVideoControls-container': {
      '& > div': {
        marginBottom: '1em'
      },

      '& .MuiSvgIcon-root': {
        stroke: theme.palette.common.black,
        strokeWidth: '1px'
      },

      '& .MuiSlider-root': {
        '& .MuiSlider-rail, & .MuiSlider-track, & .MuiSlider-thumb': {
          backgroundColor: theme.palette.common.black
        }
      }
    }
  },
  fullscreenModal: {
    height: vh(100),
    width: '100%',
    backgroundColor: '#000'
  },
  backButtonContainer: {
    position: 'absolute',
    zIndex: 5000,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4em 0em',

    '& .MuiButtonBase-root.MuiIconButton-root': {
      fontSize: '1.25em',
      zIndex: 9999
    },

    '& video': {
      maxHeight: '100%',
      maxWidth: '100%',
      objectFit: 'contain'
    }
  }
}));

export function Video({
  fit = 'cover',
  isFullscreen = false,
  thumbnailSrc,
  onCloseFullscreen,
  className,
  onClick,
  src,
  ...videoProps
}: VideoProps) {
  const classes = useStyles({ ...videoProps, fit });

  const handleClick: React.MouseEventHandler<HTMLVideoElement> = (ev) => {
    onClick?.(ev);
  };

  const video = (
    <VideoMedia
      src={src}
      muted
      className={clsx(
        classes.root,
        'SageVideo-root',
        { fullscreen: isFullscreen },
        className
      )}
      controlsType="inline"
      thumbnailSrc={thumbnailSrc}
      showPlayThumbnail
      {...videoProps}
    />
  );

  return (
    <>
      {video}
      <Modal
        open={isFullscreen}
        className={classes.fullscreenModal}
        onClose={handleClick}
      >
        <Box
          className={clsx(
            'Sage-Sarasota-back-button-container',
            classes.backButtonContainer
          )}
          onClick={onClick}
        >
          {video}
        </Box>
      </Modal>
    </>
  );
}
