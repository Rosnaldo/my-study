import { SwipeableContainer } from '@evolutionv/vysta-ui/.build/SwipeableContainer';
import { Box, Typography, makeStyles } from '@evolutionv/vysta-ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { MediaWithIpadRes } from '~/hooks/useGalleries';
import { useSyncedGallery } from '~/hooks/useSyncedGallery';
import { Image as ImageComponent } from '~/components/image';
import Page, { Props as PageProps } from '~/components/page';
import { env } from '~/helpers/env';
import { Video as VideoComponent } from '~/components/video-v2';
import { useSyncedState } from '~/hooks/useSyncedState';
import ImageWrapper from './image-wrapper';
import { Close as CloseIcon } from '@material-ui/icons';
import arrowLeft from '~/assets/arrow-left.svg';
import arrowRight from '~/assets/arrow-right.svg';
import arrowLeftPaper from '~/assets/arrow-left-paper.svg';
import arrowRightPaper from '~/assets/arrow-right-paper.svg';
import { useQueryString } from '~/hooks/useQueryString';
import { useLocation } from 'react-router';
import VideoPlayerIcon from './icons/video-player';
import ThumbnailArrowIcon from './icons/thumbnail-arrow';
import { useSyncedVideoPlayer } from '~/hooks/useSyncedVideoPlayer';
import { bufferVideos } from '~/helpers/buffer-videos';
import { ImageFromLocal } from '~/helpers/image-from-local';

type StyleProps = {
  showThumbnails: boolean;
  isFullscreen: boolean;
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },
  scrollMenuContainer: {
    display: 'flex',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxHeight: '23%'
  },
  scrollMenu: (props: StyleProps) => ({
    position: 'relative',
    width: '100%',
    padding: '1rem',
    background: theme.palette.background.paper,
    overflowX: 'scroll',
    overflowY: 'hidden',

    '& > div > div > .react-horizontal-scrolling-menu--item': {
      margin: 0,
      width: props.showThumbnails ? 'auto' : '100%'
    }
  }),
  name: {
    fontSize: '2rem',
    padding: 0,
    margin: 0
  },
  sliderWrapper: {
    overflow: 'hidden'
  },
  sliderContainer: {
    position: 'relative',
    gap: 10,
    scrollbarGutter: 'stable',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
      background: 'transparent',
      width: '0px'
    }
  },
  sliderItem: {
    width: '12rem !important',
    height: '6.5rem'
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
  presentation: ({ showThumbnails }: StyleProps) => ({
    width: '100%',
    height: '100%',
    padding: showThumbnails ? '0 10rem' : '0',
    cursor: 'pointer'
  }),
  companionContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.background.paper
  },
  playIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    aspectRatio: '1/1',
    transform: 'translateX(-50%) translateY(-50%)',
    width: '12%'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  scrollImage: {
    aspectRatio: '2 / 1',
    cursor: 'pointer'
  },
  closeThumbnails: {
    display: 'flex',
    padding: '1rem',
    gap: '.5rem',
    width: 'fit-content',
    background: theme.palette.background.paper,
    cursor: 'pointer',

    '& .MuiTypography-root': {
      textTransform: 'uppercase',
      fontSize: '1rem',
      color: 'white'
    },

    '& .MuiSvgIcon-root': {
      background: theme.palette.background.paper,
      fontSize: '1.3rem',
      color: 'white',
      transform: 'translateY(10%)'
    }
  },
  viewThumbnail: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr',
    width: '100%',
    height: '100%',

    '& > div:nth-child(2)': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '& > p': {
        fontFamily: 'Garamond',
        fontSize: '1.5rem',
        color: 'white',
        width: 'fit-content'
      },
      '& > p:nth-child(1)': {
        fontSize: '2rem',
        fontWeight: 'normal',
        color: 'white',
        width: 'fit-content'
      }
    },

    '& > div:nth-child(3)': {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',

      '& .MuiBox-root': {
        width: 'fit-content',
        padding: '1rem 2rem',
        borderRadius: '50px',
        border: '1px solid white',
        color: 'white',
        background: 'transparent',
        textTransform: 'uppercase',
        fontSize: '2rem'
      }
    }
  },
  arrowLeft: {
    left: 5
  },
  arrowRight: {
    right: 5
  },
  arrow: ({ isFullscreen }: StyleProps) => ({
    position: 'absolute',
    top: isFullscreen ? '40%' : '35%',
    zIndex: 100000,
    padding: '0.5rem',
    margin: '0 1rem',
    '& img': {
      width: '4rem',
      height: '4rem'
    }
  }),
  scrollItem: {
    width: '100%',
    height: '100%',
    '&.selected': {
      border: `1px solid ${theme.palette.common.white}`
    }
  },
  videoPlayerIcon: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)'
  }
}));

type Props = {
  title?: string;
  media?: MediaWithIpadRes[];
  pageProps?: Partial<PageProps>;
};

const Gallery: React.FC<Props> = ({ media = [], pageProps }) => {
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [isFullscreen, setIsFullscreen] = useSyncedState<boolean>(
    'video-gallery-full-screen',
    false
  );
  const classes = useStyles({ showThumbnails, isFullscreen });
  const videoControls = useSyncedVideoPlayer();
  const location = useLocation();
  const [elemIndex, setElemIndex] = useState<number>(0);
  const [queryString, setQueryString] = useQueryString({
    dataId: location.search.replaceAll('?dataId=', '') || '',
    unitModel: ''
  });
  const mediaIndex = media.findIndex((m) => m.id === queryString.dataId);
  const { currentMediaIndex, onNext, onPrevious, updateIndex } =
    useSyncedGallery(mediaIndex === -1 ? 0 : mediaIndex, media.length);

  useEffect(() => {
    const mediaId = media[currentMediaIndex]?.id;
    setQueryString({
      ...queryString,
      dataId: mediaId
    });
  }, [currentMediaIndex]);

  useEffect(() => {
    if (env.IS_IPAD || !!window.electronAPI) bufferVideos();
  }, [currentMediaIndex, isFullscreen]);

  useEffect(() => {
    videoControls.pause();
  }, [currentMediaIndex]);

  const currentMedia = media[currentMediaIndex];
  const isVideo = currentMedia?.type === 'video';

  const handleLeft = () => {
    const newElemIndex = elemIndex - 1;
    const elem = window.document.getElementsByClassName('scrollItem')[
      newElemIndex
    ] as HTMLDivElement;

    if (elem && newElemIndex >= 0) {
      window.document
        .getElementsByClassName('scrollMenuContainer')[0]
        .scrollTo({
          left: elem.offsetLeft,
          behavior: 'smooth'
        });
      setElemIndex(newElemIndex);
    }
  };

  const handleRight = () => {
    const newElemIndex = elemIndex + 1;
    const elem = window.document.getElementsByClassName('scrollItem')[
      newElemIndex
    ] as HTMLDivElement;
    const scrollContainer = window.document.getElementsByClassName(
      'scrollMenuContainer'
    )[0] as HTMLDivElement;
    const hitEnd =
      Math.ceil(scrollContainer?.scrollLeft + scrollContainer?.offsetWidth) ===
      scrollContainer?.scrollWidth;
    if (elem && !hitEnd) {
      window.document
        .getElementsByClassName('scrollMenuContainer')[0]
        .scrollTo({
          left: elem.offsetLeft,
          behavior: 'smooth'
        });
      setElemIndex(newElemIndex);
    }
  };

  if (isFullscreen && isVideo) {
    return (
      <div className={classes.companionContainer}>
        <VideoComponent
          onCloseFullscreen={() => setIsFullscreen(false)}
          key={'companion-video'}
          src={currentMedia?.url}
          videoControls={videoControls}
          isFullscreen={true}
          withCloseButton
        />
      </div>
    );
  }

  if (env.IS_COMPANION) {
    return (
      <div className={classes.companionContainer}>
        {isVideo ? (
          <Box
            style={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <ImageWrapper objectFit="contain" src={currentMedia.thumbnail} />
            <VideoPlayerIcon
              style={{ width: '8rem', height: '8rem' }}
              className={classes.videoPlayerIcon}
            />
          </Box>
        ) : (
          <ImageComponent
            fit="contain"
            src={currentMedia?.url}
            isFullscreen={isFullscreen}
            thumbnail={
              ImageFromLocal ? currentMedia?.ipadRes : currentMedia?.thumbnail
            }
          />
        )}
      </div>
    );
  }

  return (
    <Page {...pageProps}>
      <Box className={classes.container}>
        <Box
          className={clsx(classes.arrowLeft, classes.arrow)}
          onClick={onPrevious}
        >
          <img
            src={showThumbnails && !isFullscreen ? arrowLeftPaper : arrowLeft}
          />
        </Box>
        <Box
          className={clsx(classes.arrowRight, classes.arrow)}
          onClick={onNext}
        >
          <img
            src={showThumbnails && !isFullscreen ? arrowRightPaper : arrowRight}
          />
        </Box>
        <SwipeableContainer
          className={clsx(classes.swipeableContainer)}
          onSwipeLeft={onNext}
          onSwipeRight={onPrevious}
          onClick={() => setIsFullscreen(!isFullscreen)}
          swipeOffset={80}
        >
          {!isVideo || !isFullscreen ? (
            <Box className={clsx(classes.presentation)}>
              {isVideo ? (
                <Box
                  style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                >
                  <ImageWrapper
                    objectFit="contain"
                    src={currentMedia.thumbnail}
                  />
                  <VideoPlayerIcon
                    style={{ width: '8rem', height: '8rem' }}
                    className={classes.videoPlayerIcon}
                  />
                </Box>
              ) : (
                <ImageComponent
                  fit="contain"
                  src={currentMedia?.url}
                  isFullscreen={isFullscreen}
                  onCloseFullscreen={() => setIsFullscreen(false)}
                  thumbnail={
                    ImageFromLocal
                      ? currentMedia.ipadRes
                      : currentMedia?.thumbnail
                  }
                />
              )}
            </Box>
          ) : (
            <VideoComponent
              thumbnailSrc={
                ImageFromLocal
                  ? currentMedia?.ipadRes
                  : currentMedia?.thumbnail || ''
              }
              src={currentMedia?.url || ''}
              isFullscreen={isFullscreen}
              withCloseButton
            />
          )}
        </SwipeableContainer>
        <Box className={classes.scrollMenuContainer}>
          <Box
            onClick={() => setShowThumbnails(() => !showThumbnails)}
            className={classes.closeThumbnails}
          >
            <Typography>
              {showThumbnails ? 'close thumbnails' : 'open thumbnails'}
            </Typography>
            <CloseIcon />
          </Box>
          {showThumbnails && (
            <Box className={classes.scrollMenu}>
              <Box
                onClick={handleRight}
                style={{
                  position: 'absolute',
                  right: '2rem',
                  top: '50%',
                  transform: 'translateY(-30%)',
                  zIndex: 1000,
                  cursor: 'pointer'
                }}
              >
                <ThumbnailArrowIcon style={{ width: '3rem', height: '3rem' }} />
              </Box>
              <Box
                onClick={handleLeft}
                style={{
                  position: 'absolute',
                  left: '2rem',
                  top: '50%',
                  transform: 'translateY(-50%) rotate(180deg)',
                  zIndex: 1000,
                  cursor: 'pointer'
                }}
              >
                <ThumbnailArrowIcon style={{ width: '3rem', height: '3rem' }} />
              </Box>
              <ScrollMenu
                wrapperClassName={classes.sliderWrapper}
                itemClassName={classes.sliderItem}
                scrollContainerClassName={clsx(
                  classes.sliderContainer,
                  'scrollMenuContainer'
                )}
              >
                {media.map((item, index) => (
                  <div
                    key={index}
                    className={clsx('scrollItem', classes.scrollItem, {
                      selected: item.id === currentMedia.id
                    })}
                  >
                    {item.type === 'video' ? (
                      <Box
                        key={index}
                        style={{
                          width: '100%',
                          height: '100%',
                          cursor: 'pointer',
                          position: 'relative'
                        }}
                        onClick={() => updateIndex(index)}
                      >
                        <ImageWrapper objectFit="cover" src={item.thumbnail} />
                        <VideoPlayerIcon className={classes.videoPlayerIcon} />
                      </Box>
                    ) : (
                      <ImageWrapper
                        key={index}
                        src={ImageFromLocal ? item.ipadRes : item.thumbnail}
                        alt="image"
                        onClick={() => updateIndex(index)}
                        className={classes.scrollImage}
                      />
                    )}
                  </div>
                ))}
              </ScrollMenu>
            </Box>
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default Gallery;
