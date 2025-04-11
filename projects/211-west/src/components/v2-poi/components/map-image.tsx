import { makeStyles } from '@material-ui/core';
import { memo, useContext } from 'react';
import { PoiContext } from '../providers/poi';

type PropStyle = {
  bgImage: string;
};

const useStyles = makeStyles(() => ({
  image: ({ bgImage }: PropStyle) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundImage: bgImage,
    backgroundPosition: 'center',
    backgroundSize: 'contain'
  })
}));

type PropsBase = {
  src: string;
  onImageClick: () => void;
};

const BaseMapImage = ({ src, onImageClick }: PropsBase) => {
  const bgImage = `url(${src})`;

  const classes = useStyles({ bgImage });

  return (
    <img
      onClick={onImageClick}
      className={classes.image}
      alt="poi-map"
      src={src}
    />
  );
};

const MemoMapImage = memo(BaseMapImage);

type Props = {
  src: string;
};

const MapImage = ({ src }: Props) => {
  const { onImageClick } = useContext(PoiContext);
  return <MemoMapImage src={src} onImageClick={onImageClick} />;
};

export default MapImage;
