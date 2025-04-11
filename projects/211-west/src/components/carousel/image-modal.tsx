import { Box, Modal, makeStyles, vh } from '@evolutionv/vysta-ui';
import React, { RefObject } from 'react';
import clsx from 'clsx';
import { SuspendPinchZoom } from '~/components/suspend-pinch-zoom';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

interface ImageModalProps extends ImgProps {
  open: boolean;
  onClose?: () => void;
  stateTitle?: string;
  withZoom?: boolean;
  isFullscreen?: boolean;
  ref?: RefObject<HTMLImageElement>;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '90%',
    objectFit: 'contain',

    outline: 0,

    '&.fullscreen': {
      objectFit: 'contain'
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

    '& > div': {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      '& img': {
        height: '100%',
        objectFit: 'contain'
      }
    }
  }
}));

const ImageModal: React.FC<ImageModalProps> = ({
  open,
  onClick,
  withZoom,
  ref,
  stateTitle,
  className,
  onClose,
  isFullscreen,
  src,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Modal open={open} className={classes.fullscreenModal} onClose={onClick}>
      <SuspendPinchZoom>
        <Box
          className={clsx(
            'Sage-Nema-Miami-back-button-container',
            classes.backButtonContainer
          )}
          onClick={onClick}
        >
          <div>
            <img
              ref={ref}
              className={clsx(
                classes.root,
                'SageImage-root',
                { fullscreen: isFullscreen },
                className
              )}
              src={src}
              {...props}
            />
          </div>
        </Box>
      </SuspendPinchZoom>
    </Modal>
  );
};

export default ImageModal;
