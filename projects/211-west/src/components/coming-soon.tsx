import { Box, makeStyles } from '@material-ui/core';
import { getComingSoonAsset, useGalleries } from '~/hooks/useGalleries';
import clsx from 'clsx';
import { Image } from './image';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    width: '100%',

    '& img': {
      position: 'absolute',
      top: '-5vh',
      left: '-20vw',
      objectFit: 'contain'
    }
  }
}));

type Props = {
  asset?: 'page' | 'neighborhood' | 'video';
  className?: string;
  width?: string;
  height?: string;
  justImage?: boolean;
};

const ComingSoon = ({
  asset = 'page',
  className,
  width,
  height,
  justImage = false
}: Props) => {
  const classes = useStyles();

  const galleries = useGalleries();
  const assets = getComingSoonAsset(galleries, asset);

  if (justImage) return <img src={assets?.url} />;

  return (
    <Box className={clsx(classes.root, className)}>
      <img
        src={assets?.url}
        width={width || '140%'}
        height={height || '100%'}
      />
    </Box>
  );
};

export default ComingSoon;
