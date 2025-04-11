import { Box, makeStyles } from '@material-ui/core';
import { ImgHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  imageWrapper: (props: { objectFit; objectPosition }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    maxHeight: '100%',

    '& > div': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      maxHeight: '100%',

      '& > img': {
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        objectFit: props.objectFit,
        objectPosition: props.objectPosition
      }
    }
  })
}));

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  objectFit?: 'contain' | 'cover';
  objectPosition?: string;
};

const ImageWrapper = forwardRef<HTMLImageElement, Props>(
  (
    { className, objectFit = 'cover', objectPosition = 'center', ...props },
    ref
  ) => {
    const classes = useStyles({ objectFit, objectPosition });
    return (
      <Box className={clsx(classes.imageWrapper, className)}>
        <Box>
          <img ref={ref} {...props} />
        </Box>
      </Box>
    );
  }
);
ImageWrapper.displayName = 'ImageWrapper';

export default ImageWrapper;
