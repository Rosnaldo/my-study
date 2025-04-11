import { makeStyles } from '@material-ui/core';
import React, { useCallback } from 'react';
import QuickPinchZoom, { make2dTransformValue } from 'react-quick-pinch-zoom';
import clsx from 'clsx';
import { useSyncedState } from '~/hooks/useSyncedState';

type StyleProps = {
  transform: string | null;
};

const useStyles = makeStyles((theme) => ({
  image: {
    transformOrigin: '0 0',
    transform: ({ transform }: StyleProps) =>
      transform ? transform : undefined
  }
}));

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

type Props = ImgProps & {
  stateTitle?: string;
};

export const ImageWithSyncedZoom: React.FC<Props> = ({
  stateTitle,
  className,
  ...imgProps
}) => {
  const [transform, setTransform] = useSyncedState<string | null>(
    `${stateTitle}-synced-zoom-state`,
    null
  );

  const classes = useStyles({
    transform: transform
  });

  const onUpdate = useCallback(
    ({ x, y, scale }: { x: number; y: number; scale: number }) => {
      setTransform(make2dTransformValue({ x, y, scale }));
    },
    []
  );

  return (
    <QuickPinchZoom onUpdate={onUpdate} maxZoom={10} isTouch={() => true}>
      <img className={clsx(classes.image, className)} {...imgProps} />
    </QuickPinchZoom>
  );
};
