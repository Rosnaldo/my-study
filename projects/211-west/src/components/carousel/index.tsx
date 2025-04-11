import { ShowIf, SwipeableContainer } from '@evolutionv/vysta-ui';
import { Box, IconButton, makeStyles } from '@material-ui/core';
import { MediaWithIpadRes } from '~/hooks/useGalleries';
import clsx from 'clsx';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { SuspendPinchZoom } from '~/components/suspend-pinch-zoom';
import { env } from '~/helpers/env';
import {
  ScrollMenu,
  Props as ScrollViewProps
} from 'react-horizontal-scrolling-menu';
import { Close, PlayCircleOutline } from '@material-ui/icons';
import { useSyncedVideoPlayer } from '~/hooks/useSyncedVideoPlayer';
import { DotNavigation } from '@evolutionv/vysta-ui/.build/v2/components/Gallery/DotNavigation';
import { Arrow } from '~/components/carousel/arrow';
import { Image as ImageComponent } from '~/components/carousel/image';
import { Video } from '~/components/carousel/video';
import { bufferVideos } from '~/helpers/buffer-videos';
import { VideoMedia } from '@evolutionv/vysta-ui/.build/v2/components/Gallery/Media/VideoMedia';
import GalleryArrow from '~/components/icons/gallery-arrow';
import { useSyncedCarousel } from '~/hooks/useSyncedCarousel';
import { resolveMedia } from '~/helpers/media';
import { useQueryString } from '~/hooks/useQueryString';

type Props = {
  media: MediaWithIpadRes[];
  fullscreen: string;
  setFullScreen: Dispatch<SetStateAction<string>>;
  disableThumbnails?: boolean;
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    background: 'white',
    overflow: 'hidden',

    '& .Sage-DotNavigation-root': {
      height: '4em'
    },

    '& .Sage-DotNavigation-selectorContainer': {
      '& button': {
        backgroundColor: '#fff',
        borderColor: '#aaa',

        '&.current': {
          borderColor: '#001E60',
          backgroundColor: '#fff'
        }
      }
    }
  },
  preview: {
    height: '100%',
    position: 'relative',
    textAlign: 'center'
  },
  swipeableContainer: {
    height: '100%',
    width: '100%',
    opacity: 1,
    display: 'flex',
    position: 'relative',

    '& img, & video': {
      height: '100%',
      width: '100%',
      maxWidth: 'unset',
      objectFit: 'contain'
    },

    '& > div': {
      display: 'flex',
      justifyContent: 'space-evenly'
    }
  },
  closeThumbs: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#001E60',
    color: '#fff',
    padding: '0.5em 1em',
    fontWeight: 400,
    letterSpacing: '0.1em',
    fontFamily: 'GT Ultra'
  },
  sliderContainer: {
    width: '100%',
    height: '10em',
    display: 'flex',
    padding: '0 1em 0.2em 1em',
    justifyContent: 'start',
    alignItems: 'center',
    backgroundColor: '#001E60',
    borderTop: `1em solid #001E60`,
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',

    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: '0px'
    },

    '& .current': {
      background: theme.palette.text.secondary
    }
  },
  sliderWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',

    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: '0px'
    }
  },
  sliderSubcontainer: {
    paddingBottom: '0.5em',
    gap: 10,
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',

    '&::-webkit-scrollbar': {
      background: 'transparent',
      width: '0px'
    },

    '& .react-horizontal-scrolling-menu--scroll-container': {
      height: '100% !important',
      scrollbarWidth: 'none',
      '-ms-overflow-style': 'none',

      '&::-webkit-scrollbar': {
        background: 'transparent',
        width: '0px'
      }
    }
  },
  sliderItem: {
    height: '8em',
    width: '16em',
    position: 'relative',

    '& img, & video': {
      height: 'inherit',
      border: '2px solid transparent',
      width: '16em !important',
      objectFit: 'cover',

      '&.selected': {
        borderColor: 'white'
      }
    }
  },
  closeButton: {
    position: 'absolute',
    right: '1em',
    top: '1em',
    zIndex: 5000,
    color: '#fff',

    '& .MuiSvgIcon-root': {
      fontSize: '2em'
    }
  },
  videoWrapper: {
    '&.selected': {
      '& video': {
        borderColor: `white !important`
      }
    }
  },
  arrows: {
    position: 'absolute',
    left: 0,
    top: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1em',
    color: theme.palette.primary.main,
    pointerEvents: 'none',
    zIndex: 5000,
    transform: 'translateY(-50%)',

    '& svg:first-child': {
      transform: 'rotate(-180deg)'
    },

    '& svg': {
      width: '4rem',
      height: '4rem',
      fill: 'transparent'
    },

    '& > *': {
      pointerEvents: 'all'
    },

    '& .MuiSvgIcon-root': {
      fontSize: '3em'
    },
    '& .MuiIconButton-label': {
      width: '4em'
    }
  },
  companionImage: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#000',

    '& > img, & > video': {
      height: '100%',
      width: '100%',
      objectFit: 'contain'
    }
  },
  fullscreenActions: {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100%',
    zIndex: 5000
  },
  video: {
    background: '#000'
  }
}));

export const CarouselGallery = ({
  media: inputMedia,
  fullscreen: x,
  setFullScreen: y,
  disableThumbnails = false
}: Props) => {
  const classes = useStyles();

  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const apiRef: ScrollViewProps['apiRef'] = useRef<any>(null);
  const [{ dataId }] = useQueryString({ dataId: '' });
  const [fullscreenMedia, setFullscreenMedia] = useState('');

  const media = useMemo(() => {
    const response: MediaWithIpadRes[] = [];

    inputMedia.forEach((m) => {
      if (m.type === 'video') {
        const compatibleThumbnail = inputMedia.find(
          (e) =>
            e.title.toLowerCase() === m.title.toLowerCase() &&
            e.type === 'image'
        );
        response.push({
          ...m,
          thumbnail: compatibleThumbnail
            ? compatibleThumbnail.thumbnail
            : m.thumbnail
        });
      } else if (
        m.type !== 'image' ||
        !response.find(
          (e) =>
            e.title.toLowerCase() === m.title.toLowerCase() &&
            e.type === 'video'
        )
      ) {
        response.push({ ...m });
      }
    });

    return response;
  }, [inputMedia]);

  const { currentMediaIndex, updateIndex, onNext, onPrevious } =
    useSyncedCarousel({
      firstIndex: 0,
      media
    });

  const handleNextItem = useCallback(() => {
    onNext();
  }, [onNext]);

  const handlePreviousItem = useCallback(() => {
    onPrevious();
  }, [onPrevious]);

  const handleCurrentMediaFullScreen = useCallback(
    (idx: number) => {
      if (fullscreenMedia) setFullscreenMedia(media[idx].id);
    },
    [media, fullscreenMedia]
  );

  useEffect(() => {
    handleCurrentMediaFullScreen(currentMediaIndex);
  }, [currentMediaIndex]);

  useEffect(() => {
    updateIndex(media.findIndex((m) => m.id === dataId));
  }, [dataId, media]);

  const handleCloseFullscreen = useCallback(() => setFullscreenMedia(''), []);

  const handleOpenFullscreen = useCallback(
    (mediaId: string) => setFullscreenMedia(mediaId),
    []
  );

  const [showThumbnails, setShowThumbnails] = useState(true);

  const videoControls = useSyncedVideoPlayer(
    `gallery-video-${currentMediaIndex}`
  );

  const renderMainMedia = (media?: MediaWithIpadRes) => {
    if (!media) return null;

    switch (media.type) {
      case 'video':
        return (
          <div
            style={{ width: env.IS_COMPANION ? '100%' : '80%', height: '100%' }}
          >
            <VideoMedia
              key={media?.url}
              className={classes.video}
              src={media?.url || ''}
              videoControls={videoControls}
              muted={!env.IS_COMPANION}
              hideControls={env.IS_COMPANION}
            />
          </div>
        );
      default:
        return (
          <ImageComponent
            key={`gallery-media-${currentMediaIndex}-${media.id}`}
            src={media.url}
            isFullscreen={fullscreenMedia === media.id}
            closeFullscreen={handleCloseFullscreen}
            onClick={
              !env.IS_COMPANION
                ? () => handleOpenFullscreen(media.id)
                : undefined
            }
          />
        );
    }
  };

  const renderThumbnail = (mediaImage: MediaWithIpadRes, index: number) => {
    return (
      <div
        key={index}
        onClick={() => updateIndex(index)}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        <img
          className={clsx({
            selected: !![currentMediaIndex].includes(index)
          })}
          key={`gallery-thumbnail-${currentMediaIndex}`}
          src={
            env.IS_WEB && mediaImage.type !== 'video'
              ? resolveMedia(mediaImage.url, 256)
              : mediaImage.thumbnail
          }
          alt="image"
        />
        {mediaImage.type === 'video' && (
          <PlayCircleOutline
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '2em',
              height: '2em'
            }}
          />
        )}
      </div>
    );
  };

  const [shouldShowLeftArrow, setShouldShowLeftArrow] = useState(false);
  const [shouldShowRightArrow, setShouldShowRightArrow] = useState(false);

  const updateArrowStatus = useCallback(
    (arrow: 'left' | 'right') => {
      if (arrow === 'left') {
        const galleryContainer = galleryContainerRef.current;
        if (!galleryContainer) return;

        const scrollContainer = galleryContainer.querySelector(
          '.react-horizontal-scrolling-menu--scroll-container'
        );
        if (!scrollContainer) return;

        const visibleDataIndexChilds: number[] = [];
        for (let i = 0; i < scrollContainer.children.length; i++) {
          const child = scrollContainer.children[i];
          if (
            child.getAttribute('data-index') &&
            child.classList.contains('react-horizontal-scrolling-menu--item')
          ) {
            const rect = child.getBoundingClientRect();
            const scrollContainerRect = scrollContainer.getBoundingClientRect();
            if (
              rect.right > scrollContainerRect.left &&
              rect.left < scrollContainerRect.right
            ) {
              const result = child.getAttribute(
                'data-index'
              ) as unknown as string;
              visibleDataIndexChilds.push(+result);
            }
          }
        }

        if (visibleDataIndexChilds[0] > 0) setShouldShowLeftArrow(true);
        else setShouldShowLeftArrow(false);
      } else {
        const galleryContainer = galleryContainerRef.current;
        if (!galleryContainer) return;

        const scrollContainer = galleryContainer.querySelector(
          '.react-horizontal-scrolling-menu--scroll-container'
        );
        if (!scrollContainer) return;

        const visibleDataIndexChilds: number[] = [];
        for (let i = 0; i < scrollContainer.children.length; i++) {
          const child = scrollContainer.children[i];
          if (
            child.getAttribute('data-index') &&
            child.classList.contains('react-horizontal-scrolling-menu--item')
          ) {
            const rect = child.getBoundingClientRect();
            const scrollContainerRect = scrollContainer.getBoundingClientRect();
            if (
              rect.right > scrollContainerRect.left &&
              rect.left < scrollContainerRect.right
            ) {
              const result = child.getAttribute(
                'data-index'
              ) as unknown as string;
              visibleDataIndexChilds.push(+result);
            }
          }
        }

        if (
          visibleDataIndexChilds[visibleDataIndexChilds.length - 1] <
          media.length - 1
        )
          setShouldShowRightArrow(true);
        else setShouldShowRightArrow(false);
      }
    },
    [
      galleryContainerRef.current,
      media,
      setShouldShowLeftArrow,
      setShouldShowRightArrow
    ]
  );

  const handleThumbnailsArrowClick = useCallback(
    (dir: 'left' | 'right') => {
      const galleryContainer = galleryContainerRef.current;
      if (galleryContainer) {
        const scrollContainer = galleryContainer.querySelector(
          '.react-horizontal-scrolling-menu--scroll-container'
        );

        if (scrollContainer) {
          const visibleDataIndexChilds: number[] = [];
          let totalItemsAmount: number = 0;

          for (let i = 0; i < scrollContainer.children.length; i++) {
            const child = scrollContainer.children[i];
            if (
              child.getAttribute('data-index') &&
              child.classList.contains('react-horizontal-scrolling-menu--item')
            ) {
              const rect = child.getBoundingClientRect();
              const scrollContainerRect =
                scrollContainer.getBoundingClientRect();
              if (
                rect.right > scrollContainerRect.left &&
                rect.left < scrollContainerRect.right
              ) {
                const result = child.getAttribute(
                  'data-index'
                ) as unknown as string;
                visibleDataIndexChilds.push(+result);
              }
              totalItemsAmount++;
            }
          }

          const currentIndexBase =
            dir === 'left'
              ? visibleDataIndexChilds[0]
              : visibleDataIndexChilds[visibleDataIndexChilds.length - 1];
          let jumpTo: number | null = null;

          if (dir === 'right') {
            if (currentIndexBase + 3 <= totalItemsAmount) jumpTo = 3;
            else if (currentIndexBase + 2 <= totalItemsAmount) jumpTo = 2;
            else if (currentIndexBase + 1 <= totalItemsAmount) jumpTo = 1;
          } else {
            if (currentIndexBase - 3 >= 0) jumpTo = 3;
            else if (currentIndexBase - 2 >= 0) jumpTo = 2;
            else if (currentIndexBase - 1 >= 0) jumpTo = 1;
          }

          if (jumpTo)
            jumpTo =
              dir === 'right'
                ? currentIndexBase + jumpTo
                : currentIndexBase - jumpTo;

          if ((jumpTo || 0) > media.length - 1) {
            const length = scrollContainer.children.length;
            const lastChild = scrollContainer.children[length - 1];
            lastChild.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'nearest'
            });
            return;
          }

          for (let i = 0; i < scrollContainer.children.length; i++) {
            const child = scrollContainer.children[i];
            if (
              child.getAttribute('data-index') &&
              child.classList.contains('react-horizontal-scrolling-menu--item')
            ) {
              const dataIndex = child.getAttribute(
                'data-index'
              ) as unknown as string;
              if (+dataIndex === jumpTo) {
                child.scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'nearest'
                });
                break;
              }
            }
          }
        }
      }
    },
    [media]
  );

  const handleScroll = () => {
    updateArrowStatus('left');
    updateArrowStatus('right');
  };

  useEffect(() => {
    // make arrows update on initial load
    if (!!galleryContainerRef.current) handleScroll();
  }, [galleryContainerRef.current]);

  const preloadFirstImage = () => {
    if (media[0]?.type === 'image') {
      const img = new Image();
      img.src = media[0]?.url;
    }
  };

  useEffect(() => {
    if (env.IS_IPAD) bufferVideos();
  }, [currentMediaIndex]);

  useEffect(() => {
    videoControls.pause();
  }, [currentMediaIndex]);

  useLayoutEffect(() => {
    preloadFirstImage();
  }, [preloadFirstImage]);

  if (env.IS_COMPANION) {
    return (
      <Box className={classes.companionImage}>
        {renderMainMedia(media[currentMediaIndex])}
      </Box>
    );
  }

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.preview}>
          <ShowIf
            show={!env.IS_COMPANION && !fullscreenMedia && media?.length > 1}
          >
            <Box
              className={clsx(classes.arrows, {
                thumbsOpened: !fullscreenMedia
              })}
            >
              <GalleryArrow onClick={handlePreviousItem} />
              <GalleryArrow onClick={handleNextItem} />
            </Box>
          </ShowIf>
          <SwipeableContainer
            className={clsx(classes.swipeableContainer)}
            onSwipeLeft={handleNextItem}
            onSwipeRight={handlePreviousItem}
            swipeOffset={80}
            disabled={
              !!fullscreenMedia || media[currentMediaIndex]?.type === 'video'
            }
          >
            <SuspendPinchZoom>
              {renderMainMedia(media[currentMediaIndex])}
            </SuspendPinchZoom>
          </SwipeableContainer>
          {!disableThumbnails && (
            <>
              {showThumbnails ? (
                <Box
                  className={classes.closeThumbs}
                  onClick={() => setShowThumbnails(false)}
                >
                  CLOSE THUMBNAILS X
                </Box>
              ) : (
                <Box
                  className={classes.closeThumbs}
                  onClick={() => setShowThumbnails(true)}
                >
                  OPEN THUMBNAILS ^
                </Box>
              )}
            </>
          )}
        </Box>

        {disableThumbnails && (
          <DotNavigation
            dataId={'gallery-collection'}
            currentMediaIndex={currentMediaIndex}
            media={media}
            onMediaClick={(index: number) => updateIndex(index)}
            onNextMedia={onNext}
            onPrevMedia={onPrevious}
            hideArrows={true}
          />
        )}

        {showThumbnails && !disableThumbnails && (
          <div className={classes.sliderContainer} ref={galleryContainerRef}>
            <ScrollMenu
              onScroll={handleScroll}
              apiRef={apiRef}
              LeftArrow={
                shouldShowLeftArrow ? (
                  <Arrow
                    direction="left"
                    disabled={false}
                    onClick={() => handleThumbnailsArrowClick('left')}
                  />
                ) : null
              }
              RightArrow={
                shouldShowRightArrow ? (
                  <Arrow
                    direction="right"
                    disabled={false}
                    onClick={() => handleThumbnailsArrowClick('right')}
                  />
                ) : null
              }
              wrapperClassName={classes.sliderWrapper}
              itemClassName={classes.sliderItem}
              scrollContainerClassName={classes.sliderSubcontainer}
            >
              {media.map((media, index) => renderThumbnail(media, index))}
            </ScrollMenu>
          </div>
        )}
      </Box>
      <ShowIf show={!!fullscreenMedia}>
        <Box className={classes.fullscreenActions}>
          <Box className={classes.arrows}>
            <GalleryArrow onClick={handlePreviousItem} />
            <GalleryArrow onClick={handleNextItem} />
          </Box>
          <IconButton
            className={classes.closeButton}
            size="small"
            onClick={handleCloseFullscreen}
          >
            <Close />
          </IconButton>
        </Box>
      </ShowIf>
    </>
  );
};
