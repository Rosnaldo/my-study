import { makeStyles } from '@evolutionv/vysta-ui';
import clsx from 'clsx';
import { useCallback, useRef } from 'react';
import ImageModal from '~/components/carousel/image-modal';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

export interface ImageProps extends ImgProps {
  fit?: 'cover' | 'contain';
  disableFullscreen?: boolean;
  isFullscreen?: boolean;
  onFullscreenChange?: (isFullscreen: boolean) => void;
  closeFullscreen?: () => void;
  stateTitle?: string;
  withZoom?: boolean;
  imageRef?: React.MutableRefObject<HTMLImageElement | null>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',

    outline: 0,

    '&.fullscreen': {
      objectFit: 'contain'
    }
  }
}));

export function Image({
  fit = 'cover',
  disableFullscreen = false,
  isFullscreen,
  onFullscreenChange,
  closeFullscreen,
  stateTitle,
  withZoom = false,
  imageRef,
  ...imgProps
}: ImageProps) {
  const { className, onClick, ...props } = imgProps;
  const classes = useStyles({ ...imgProps, fit });
  const ref = imageRef || useRef<HTMLImageElement | null>(null);

  const handleClose = useCallback(() => {
    if (!closeFullscreen) {
      onFullscreenChange?.(false);
    } else if (closeFullscreen) {
      closeFullscreen();
    }
  }, [onFullscreenChange, closeFullscreen]);

  return (
    <>
      <img
        ref={ref}
        className={clsx(
          classes.root,
          'SageImage-root',
          { fullscreen: isFullscreen },
          className
        )}
        onClick={onClick}
        {...props}
      />
      <ImageModal
        open={!!isFullscreen && !disableFullscreen}
        isFullscreen={isFullscreen}
        ref={ref}
        stateTitle={stateTitle}
        className={className}
        onClick={onClick}
        onClose={handleClose}
        {...props}
      />
    </>
  );
}
