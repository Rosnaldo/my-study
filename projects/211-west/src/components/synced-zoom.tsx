import { makeStyles } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo } from 'react';
import QuickPinchZoom, { make2dTransformValue } from 'react-quick-pinch-zoom';
import clsx from 'clsx';
import { useSyncedState } from '~/hooks/useSyncedState';
import { env } from '~/helpers/env';
import { useSyncedImageZoom } from '~/hooks/useSyncedImageZoom';

type StyleProps = {
  transform: string | null;
};

export type InitialPosition = {
  x: number;
  y: number;
  scale: number;
};

const useStyles = makeStyles((theme) => ({
  zoom: {
    height: '100%',
    width: '100%',
    transform: ({ transform }: StyleProps) =>
      transform ? transform : undefined
  }
}));

export type ComponentWithSyncedZoomProps = {
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
  offSet?: number;
  onChangeZoom?: (zoom: number) => void;
  currentCenter?: [number, number];
  isSquareImage?: boolean;
  initialPosition?: InitialPosition;
  imageViewSizes?: {
    verticalOffset: number;
    horizontalOffset: number;
  };
  stateTitle?: string;
};

export const ComponentWithSyncedZoom: React.FC<
  ComponentWithSyncedZoomProps
> = ({
  className,
  ref,
  children,
  onChangeZoom = () => {},
  currentCenter,
  stateTitle,
  imageViewSizes: { verticalOffset, horizontalOffset } = {}
}) => {
  const zoomRef = React.useRef<QuickPinchZoom>(null);
  const [transformValues, setTransformValues] = useSyncedState<{
    x: number;
    y: number;
    scale: number;
    ipadHorizontalOffset: number;
    ipadVerticalOffset: number;
  } | null>(`synced-transform-${stateTitle}`, null);

  const { zoomState } = useSyncedImageZoom();

  const { horizontalFactor, verticalFactor } = useMemo(
    () => ({
      horizontalFactor:
        (window.innerWidth + (horizontalOffset || 0) * 2) /
        (zoomState.windowWidth +
          (transformValues?.ipadHorizontalOffset || 0) * 2),
      verticalFactor:
        (window.innerHeight + (verticalOffset || 0) * 2) /
        (zoomState.windowHeight +
          (transformValues?.ipadVerticalOffset || 0) * 2)
    }),
    [
      window.innerHeight,
      zoomState.windowHeight,
      horizontalOffset,
      verticalOffset,
      transformValues?.ipadHorizontalOffset,
      transformValues?.ipadVerticalOffset
    ]
  );

  const almostEqual = (a?: number, b?: number, precision: number = 0.1) => {
    return Math.abs((a || Infinity) - (b || 0)) < precision;
  };
  const transform = useMemo(() => {
    if (!transformValues) {
      return null;
    }

    if (env.IS_COMPANION) {
      return make2dTransformValue({
        ...transformValues,
        x:
          transformValues.x * horizontalFactor -
          (horizontalOffset || 0) / transformValues.scale,
        y:
          transformValues.y * verticalFactor -
          (verticalOffset || 0) / transformValues.scale
      });
    }

    return make2dTransformValue({
      ...transformValues,
      x: transformValues.x - (horizontalOffset || 0) / transformValues.scale,
      y: transformValues.y - (verticalOffset || 0) / transformValues.scale
    });
  }, [transformValues, zoomRef.current, verticalFactor, horizontalFactor]);

  const classes = useStyles({
    transform: transform
  });

  const onUpdate = useCallback(
    ({ x, y, scale }: { x: number; y: number; scale: number }) => {
      if (scale < 0.95) return;
      onChangeZoom?.(scale);

      setTransformValues((prev) =>
        almostEqual(prev?.x, x, 1) &&
        almostEqual(prev?.y, y, 1) &&
        almostEqual(prev?.scale, scale)
          ? prev
          : {
              x: x,
              y: y,
              scale,
              ipadHorizontalOffset: horizontalOffset || 0,
              ipadVerticalOffset: verticalOffset || 0
            }
      );
    },
    [verticalOffset, horizontalOffset]
  );

  useEffect(() => {
    if (env.IS_COMPANION || !currentCenter?.length) return;

    if (
      almostEqual(currentCenter[0], transformValues?.x || 0) &&
      almostEqual(currentCenter[1], transformValues?.y || 0) &&
      almostEqual(2, transformValues?.scale || 0)
    )
      return;

    zoomRef.current?.alignCenter({
      x: currentCenter[0],
      y: currentCenter[1] - (verticalOffset || 0),
      scale: 1
    });
  }, [currentCenter]);

  return (
    <QuickPinchZoom
      onUpdate={onUpdate}
      maxZoom={1}
      ref={zoomRef}
      verticalPadding={verticalOffset}
      horizontalPadding={horizontalOffset}
      shouldInterceptWheel={() => true}
      tapZoomFactor={1}
      zoomOutFactor={1}
      doubleTapZoomOutOnMaxScale
    >
      <div ref={ref} className={clsx(classes.zoom, className)}>
        {children}
      </div>
    </QuickPinchZoom>
  );
};
