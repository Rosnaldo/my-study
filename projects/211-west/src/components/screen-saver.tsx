import { makeStyles } from '@evolutionv/vysta-ui';
import { useEffect, useState } from 'react';
import { transition, vh } from '~/helpers/style';
import { useScreenSaver } from '~/hooks/useScreenSaver';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: vh(100),
    width: '100vw'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: vh(100),
    width: '100vw',
    objectFit: 'contain',
    zIndex: 10000,
    transition: transition('all'),
    pointerEvents: 'none',
    opacity: 0,
    backgroundColor: '##001E60',

    '&.show': {
      opacity: 1,
      pointerEvents: 'all'
    }
  }
}));

type Props = {
  slideInterval: number;
};

export function ScreenSaver(props: Props) {
  const { slideInterval } = props;
  const [{ media = [] }] = useScreenSaver();
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    if (media.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex((index) => (index + 1) % media.length);
    }, slideInterval);

    return () => {
      clearInterval(interval);
    };
  }, [media]);

  return (
    <div className={classes.root} id="screen-saver">
      {media.map((currentMedia, index) => {
        const mediaType = currentMedia.split('.').pop();
        if (mediaType === 'mp4') {
          return (
            <video
              key={currentMedia}
              src={currentMedia || ''}
              className={clsx(classes.image, {
                show: currentMediaIndex === index
              })}
              autoPlay
              loop
              playsInline
            />
          );
        }
        return (
          <img
            key={currentMedia}
            src={currentMedia || ''}
            className={clsx(classes.image, {
              show: currentMediaIndex === index
            })}
          />
        );
      })}
    </div>
  );
}
