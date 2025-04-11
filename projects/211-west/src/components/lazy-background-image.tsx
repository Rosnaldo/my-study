import React, { useCallback, useEffect, useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderImg?: string;
  errorImg?: string;
  fit?: 'contain' | 'cover';
}

type PropS = {
  placeholderImg: string;
  fit?: 'contain' | 'cover';
};

const useStyles = makeStyles(() => ({
  imageWrapper: ({ fit }: PropS) => ({
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
        objectFit: fit,
        objectPosition: 'center',
        transition: 'opacity 100ms ease-in-out',
        opacity: 0
      },
      '& > img[data-is-current-page="true"]': {
        opacity: 1
      }
    }
  }),
  background: ({ placeholderImg, fit }: PropS) => ({
    width: '100%',
    height: '100%',
    backgroundImage: `url('${placeholderImg}')`,
    backgroundSize: fit,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  })
}));

export default ({ src, fit, placeholderImg, errorImg }: ImageProps) => {
  const [imgSrc, setSrc] = useState(false);

  const classes = useStyles({ placeholderImg: placeholderImg!, fit });
  const onLoad = useCallback(() => {
    setSrc(true);
  }, [src]);

  const onError = useCallback(() => {
    // setSrc(errorImg || placeholderImg);
  }, [errorImg, placeholderImg]);

  useEffect(() => {
    setSrc(false);
  }, [src, placeholderImg]);

  useEffect(() => {
    const img = new Image();
    img.src = src as string;

    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);

    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [src, onLoad, onError]);

  return (
    <div className={classes.background}>
      <Box className={classes.imageWrapper}>
        <Box>
          {imgSrc && (
            <img
              src={src}
              alt="title"
              loading="lazy"
              data-is-current-page={imgSrc}
            />
          )}
        </Box>
      </Box>
    </div>
  );
};
