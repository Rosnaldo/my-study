import {
  VideoMedia,
  VideoMediaProps
} from '@evolutionv/vysta-ui/.build/v2/components/Gallery/Media/VideoMedia';
import { IconButton, makeStyles, Modal } from '@material-ui/core';
import clsx from 'clsx';
import { ExceptCompanion } from './conditionals';
import { Close } from '@material-ui/icons';
import { env } from '~/helpers/env';

export interface VideoProps
  extends React.VideoHTMLAttributes<HTMLVideoElement>,
    Omit<VideoMediaProps, 'src'> {
  fit?: 'cover' | 'contain';
  isFullscreen?: boolean;
  onClose?: () => void;
  playOnMount?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: ({ width }: VideoProps) => width || '100vw',
    height: ({ height }: VideoProps) => height || '100vh',
    objectFit: ({ fit }: VideoProps) => fit || 'contain',

    outline: 0,

    '& img': {
      objectFit: 'cover'
    },

    '&.fullscreen': {
      objectFit: 'contain',
      height: '100vh'
    },

    '& video': {
      '@media (min-width: 2600px)': {
        maxWidth: '49.9vw',
        maxHeight: '50vh',
        transformOrigin: 'left',
        transform: 'scale(2)',
        '-webkit-transform-origin-y': 'top',
        objectFit: 'cover'
      }
    }
  },
  fullscreenModal: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: '#001E60'
  },
  closeButton: {
    position: 'absolute',
    width: '5vh',
    height: '5vh',
    top: '1em',
    right: '1em',
    zIndex: 5000,
    color: 'white'
  }
}));

export function Video({
  fit = 'cover',
  isFullscreen = false,
  onClose,
  playOnMount,
  ...videoProps
}: VideoProps) {
  const { className, onClick, src, ...props } = videoProps;
  const classes = useStyles({ ...videoProps, fit });

  return (
    <Modal
      open={isFullscreen}
      className={classes.fullscreenModal}
      onClose={onClose}
    >
      <>
        <VideoMedia
          src={src}
          className={clsx(
            classes.root,
            'SageVideo-root',
            { fullscreen: true },
            className
          )}
          videoControls={{
            onReady: (handler) => {
              videoProps.videoControls?.onReady?.(handler);
              if (playOnMount) handler.play();
            },
            onEnded: () => {
              onClose?.();
            }
          }}
          hideControls={env.IS_COMPANION}
          {...props}
        />
        <ExceptCompanion>
          <IconButton
            className={classes.closeButton}
            size="small"
            onClick={onClose}
          >
            <Close />
          </IconButton>
        </ExceptCompanion>
      </>
    </Modal>
  );
}
