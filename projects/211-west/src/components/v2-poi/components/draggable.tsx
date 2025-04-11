import { PropsWithChildren, useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDrag } from '../hooks/useDrag';
import { useZoomToogle } from '../hooks/useZoomToogle';
import { useZoom } from '../store/zoom';
import { PoiContext } from '../providers/poi';
import { PositionContext } from '../providers/position';

type PropStyle = {
  height: number;
  width: number;
  top: number;
  left: number;
};

const useStyles = makeStyles(() => ({
  content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  draggable: ({ width, height, top, left }: PropStyle) => ({
    position: 'absolute',
    width: `${width}%`,
    height: `${height}%`,
    top: `-${top}%`,
    left: `-${left}%`
  })
}));

type Props = {};

const Draggable: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const { imageFactor } = useContext(PoiContext);
  const { position, setCenter, draggableRef, contentRef } =
    useContext(PositionContext);

  const [{ zoom }] = useZoom();

  const classes = useStyles({
    height: imageFactor.height * zoom,
    width: imageFactor.width * zoom,
    top: position?.y || 0,
    left: position?.x || 0
  });

  useDrag({
    imageFactor,
    position,
    setCenter,
    draggableRef,
    contentRef,
    zoom
  });
  useZoomToogle({ contentRef, draggableRef, setCenter });

  return (
    <div className={classes.content} ref={contentRef}>
      <div className={classes.draggable} ref={draggableRef}>
        {children}
      </div>
    </div>
  );
};

export default Draggable;
