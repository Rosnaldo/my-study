import {
  VideoMedia,
  VideoMediaProps
} from '@evolutionv/vysta-ui/.build/v2/components/Gallery/Media/VideoMedia';
import { Box, makeStyles } from '@evolutionv/vysta-ui';
import clsx from 'clsx';
import { env } from '~/helpers/env';
import { MediaWithIpadRes } from '~/hooks/useGalleries';
import { useSyncedGallery } from '~/hooks/useSyncedGallery';
import { useSyncedState } from '~/hooks/useSyncedState';
import { Video as VideoComponent } from '~/components/video-v2';
import { useCallback, useMemo } from 'react';
import PlayIcon from '@evolutionv/vysta-ui/.build/v2/icons/play';
import { useSyncedVideoPlayer } from '~/hooks/useSyncedVideoPlayer';
import { pxToVh, pxToVw } from '~/helpers/style';
import { useQueryString } from '~/hooks/useQueryString';

const useStyles = makeStyles((theme) => {
  const titleBarHeight = '2.3em';

  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',

      '& .hide': {
        display: 'none',
        pointerEvents: 'none'
      }
    },
    preview: {
      background: 'black',
      height: '100vh',
      position: 'relative',
      textAlign: 'center'
    },
    thumbsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      gap: '2em',
      padding: env.IS_COMPANION ? '8em 3em' : '2em 2em'
    },

    thumb: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '1vh',
      height: '80vh',

      '& span': {
        fontSize: pxToVw(60),
        lineHeight: pxToVh(71),
        width: '100%',
        textAlign: 'center',
        textTransform: 'capitalize'
      },

      '& video, > img': { objectFit: 'cover', pointerEvents: 'none' }
    },

    playIcon: {
      position: 'absolute',
      width: '7vw',
      left: 'calc(50% - 3.5vw)',
      top: '32vh'
    },

    swipeableContainer: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      left: 0,
      top: 0,
      transition: 'left .35s, opacity .15s',
      opacity: 1
    },
    arrows: {
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      padding: '1em',
      zIndex: 5000,

      '& .MuiIconButton-root': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      },

      '& .MuiSvgIcon-root': {
        color: 'white',
        fontSize: '3em'
      }
    },
    closeButton: {
      position: 'absolute',
      left: '1em',
      zIndex: 5000,
      backgroundColor: 'black',
      color: theme.palette.primary.dark,

      '& .MuiSvgIcon-root': {
        fontSize: '3em'
      }
    },
    companionContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#000',

      '& > video, & > img': {
        height: '100vh',
        width: '100vw',
        objectFit: 'contain'
      }
    },
    videoMedia: {
      height: `calc(100% - ${titleBarHeight})`,
      paddingBottom: '1em',

      '&.onlyControls': {
        paddingBottom: '2em'
      }
    },

    fullscreenContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#000',

      '& > video, & > img': {
        height: '100vh',
        width: '100vw'
      }
    },

    logoBackground: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      padding: '10em',
      objectFit: 'contain'
    }
  };
});

type Props = {
  title: string;
  media?: MediaWithIpadRes[];
  thumbnails?: Record<string, MediaWithIpadRes>;
  videoMediaProps?: Omit<VideoMediaProps, 'src'>;
  showTitle?: boolean;
};

const VideoGallery: React.FC<Props> = ({
  title,
  media = [],
  thumbnails = {},
  showTitle = false
}) => {
  const classes = useStyles();
  const [queryString, setQueryString] = useQueryString({
    dataId: location.search.replaceAll('?dataId=', '') || '',
    unitModel: ''
  });
  const mediaIndex = media.findIndex((m) => m.id === queryString.dataId);
  const { currentMediaIndex, updateIndex } = useSyncedGallery(
    mediaIndex === -1 ? 0 : mediaIndex,
    media.length
  );
  const videoControls = useSyncedVideoPlayer();

  const [isFullscreen, setIsFullscreen] = useSyncedState<boolean>(
    `is-video-gallery-${title}-fullscreen`,
    false
  );

  const handleToggleFullscreen = useCallback(
    () => setIsFullscreen((prevState) => !prevState),
    []
  );

  const handleClickThumb = (index: number) => {
    updateIndex(index);
    handleToggleFullscreen();
  };

  return useMemo(() => {
    if (!media.length) {
      return null;
    }

    if (isFullscreen) {
      return (
        <div className={classes.fullscreenContainer}>
          <VideoComponent
            key={'fullscreen-video'}
            src={media[currentMediaIndex]?.url}
            videoControls={videoControls}
          />
        </div>
      );
    }

    return (
      <Box className={classes.container}>
        <Box className={clsx(classes.thumbsContainer, { hide: isFullscreen })}>
          {media.map((m, i) => (
            <Box
              key={`media-${m.title}-${i}`}
              className={classes.thumb}
              onClick={() => handleClickThumb(i)}
            >
              {thumbnails[m.title]?.url ? (
                <img
                  src={thumbnails[m.title]?.url}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <VideoMedia src={m.thumbnail} hideControls />
              )}
              {showTitle && <span>{m.title}</span>}
              <PlayIcon className={classes.playIcon} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }, [media, thumbnails, isFullscreen, classes, currentMediaIndex]);
};

export default VideoGallery;
