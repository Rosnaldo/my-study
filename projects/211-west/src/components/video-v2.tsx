import {
  VideoMedia,
  VideoMediaProps
} from '@evolutionv/vysta-ui/.build/v2/components/Gallery/Media/VideoMedia';
import { alpha, IconButton, makeStyles, Modal } from '@evolutionv/vysta-ui';
import clsx from 'clsx';
import { vh } from '~/helpers/style';
import { ExceptCompanion } from '~/components/conditionals';
import { Close } from '@material-ui/icons';

type HtmlVideoProps = React.ImgHTMLAttributes<HTMLVideoElement>;

export interface VideoProps
  extends HtmlVideoProps,
    Omit<VideoMediaProps, 'src'> {
  fit?: 'cover' | 'contain';
  isFullscreen?: boolean;
  withCloseButton?: boolean;
  onCloseFullscreen?: () => void;
}

const useStyles = makeStyles((theme) => ({
  root: ({ width, height, fit }: VideoProps) => ({
    width: width || '100%',
    height: height || '100%',
    objectFit: fit || 'contain',

    outline: 0,

    '&.fullscreen': {
      objectFit: 'contain'
    }
  }),
  fullscreenModal: {
    height: vh(100),
    width: '100%',
    backgroundColor: 'black'
  },
  button: {
    backgroundColor: alpha(theme.palette.common.white, 0.8),
    padding: '0.25em',
    position: 'absolute',
    top: '1em',
    right: '1em',
    fontSize: '1.5em',
    zIndex: 10000,

    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.5)
    }
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
  withCloseButton = false,
  onCloseFullscreen,
  ...videoProps
}: VideoProps) {
  const { className, src, ...props } = videoProps;
  const classes = useStyles({ ...videoProps, fit });

  return (
    <>
      <VideoMedia
        src={src}
        className={clsx(
          classes.root,
          'SageVideo-root',
          { fullscreen: isFullscreen },
          className
        )}
        {...props}
        disableFullscreen
        autoPlay
      />
      <Modal
        open={isFullscreen}
        className={classes.fullscreenModal}
        onClose={onCloseFullscreen}
      >
        <>
          {withCloseButton && (
            <ExceptCompanion>
              <IconButton
                className={classes.closeButton}
                size="small"
                onClick={onCloseFullscreen}
              >
                <Close />
              </IconButton>
            </ExceptCompanion>
          )}
          <VideoMedia
            src={src}
            className={clsx(
              classes.root,
              'SageVideo-root',
              { fullscreen: isFullscreen },
              className
            )}
            {...props}
            disableFullscreen
            autoPlay
          />
        </>
      </Modal>
    </>
  );
}
