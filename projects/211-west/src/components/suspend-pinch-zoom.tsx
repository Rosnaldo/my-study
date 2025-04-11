import { useLayoutEffect, useRef } from 'react';
import { makeStyles } from '@evolutionv/vysta-ui';

interface SuspendPinchZoom {
  children: React.ReactNode;
}

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    height: '100%',
    width: '100%'
  }
}));

const MAX_EVENT_TOUCHES = 1;

/**
 * Disables pinch zooming on children elements.
 * Meant to be used on images.
 */
export function SuspendPinchZoom({ children }: SuspendPinchZoom) {
  const classes = useStyles();
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) return;

    const disablePinchZoom = (event: TouchEvent) => {
      if (event.touches.length > MAX_EVENT_TOUCHES) {
        event.preventDefault();
      }
    };

    element.addEventListener('touchmove', disablePinchZoom, { passive: false });

    return () => {
      element.removeEventListener('touchmove', disablePinchZoom);
    };
  }, []);

  return (
    <div className={classes.root} ref={ref}>
      {children}
    </div>
  );
}
