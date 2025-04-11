import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Theme,
  makeStyles
} from '@material-ui/core';
import clsx from 'clsx';
import TrianguleIcon from './icons/triangule';
import { Position, MapArea, TooltipDisplay } from '../types';

const findHorizontalOrientation = (center: Position, popoverWidth: number) => {
  if (center.x / 100 + popoverWidth / 2 < popoverWidth) return 'left';
  if (center.x / 100 + popoverWidth > window.innerWidth) return 'right';
  return 'default';
};

const calcRotationSvg = (reversed: boolean) => {
  if (reversed) return 'rotate(180deg)';
  return 'rotate(0deg)';
};

const calcTranslateSvg = (
  reversed: boolean,
  horizontalOrientation: 'left' | 'right' | 'default'
) => {
  switch (horizontalOrientation) {
    case 'left':
      if (reversed) return `translate(-50%, 110%)`;
      return `translate(-50%, -210%)`;
    case 'right':
      if (reversed) return `translate(-50%, 110%)`;
      return `translate(-50%, -210%)`;
    default:
      if (reversed) return `translate(-50%, 110%)`;
      else return 'translate(-50%, 110%)';
  }
};

const calcTranslate = (
  horizontalOrientation: 'left' | 'right' | 'default',
  reversed: boolean
) => {
  switch (horizontalOrientation) {
    case 'left':
      if (reversed) return `translate(-6.5%, 0%)`;
      return 'translate(-6.5%, -50%)';
    case 'right':
      if (reversed) return `translate(-6.5%, 0%)`;
      return `translate(-6.5%, -50%)`;
    default:
      return 'translateX(-6.5%)';
  }
};

const useStyles = makeStyles<
  Theme,
  {
    center: Position;
    fill: string;
    reversed: boolean;
    horizontalOrientation: 'left' | 'right' | 'default';
  }
>(() => ({
  tooltipMarker: {
    position: 'absolute',
    zIndex: 3,
    top: ({ center }) => `${center.y}%`,
    left: ({ center }) => `${center.x}%`,
    transition: 'opacity 0.3s ease-in-out',
    fill: ({ fill }) => fill
  },

  expandableMarker: ({ reversed, horizontalOrientation, fill }) => ({
    '& svg': {
      position: 'absolute',
      top: ({ center }) => `${center.y}%`,
      left: ({ center }) => `${center.x}%`,
      transition: 'position 0.8s ease-in-out',
      transform: `${calcTranslateSvg(
        reversed,
        horizontalOrientation
      )} ${calcRotationSvg(reversed)}`,
      width: '3rem',
      height: '1.5rem',
      fill
    },

    '& .MuiAccordion-root': {
      position: 'absolute',
      ...(reversed
        ? {
            top: '3rem'
          }
        : {
            bottom: '1.3rem'
          }),
      transform: ({ horizontalOrientation, reversed }) =>
        calcTranslate(horizontalOrientation, reversed),
      width: 'calc(10vw + 10rem)',
      backgroundColor: ({ fill }) => fill,
      padding: '1rem 3rem'
    },

    '& .MuiAccordionSummary-root': {
      padding: '0',
      minHeight: 'unset',
      '& > div': { marginTop: '0 !important', marginBottom: '0 !important' }
    },

    '& .MuiAccordionSummary-content': {
      flexGrow: 'unset'
    }
  })
}));

const Tooltip: TooltipDisplay = ({
  area,
  center,
  fill,
  popoverWidth = 270,
  popoverHeight = 300,
  ...props
}: {
  area: MapArea;
  center: Position;
  fill?: string;
  customerContent?: React.ReactNode;
  customerPointer?: React.ReactNode;
  tooltipAutoClose?: boolean;
  popoverWidth?: number;
  popoverHeight?: number;
}) => {
  const title = area.name;

  const reversed = center.y < 90;
  const horizontalOrientation = findHorizontalOrientation(center, popoverWidth);

  const classes = useStyles({
    center,
    fill: fill || 'black',
    reversed,
    horizontalOrientation
  });

  return (
    <ExpandableMarker
      className={clsx(
        'Sage-PoiTooltip',
        classes.tooltipMarker,
        classes.expandableMarker
      )}
      title={title}
      fill={fill}
      {...props}
    />
  );
};

const ExpandableMarker = ({
  title,
  description,
  fill,
  customContent,
  customPointer,
  ...props
}: {
  fill?: string;
  title?: string;
  description?: string;
  className?: string;
  customContent?: React.ReactNode;
  customPointer?: React.ReactNode;
}) => {
  const hasDescription = !!description;

  return (
    <div {...props}>
      <Accordion style={{ pointerEvents: 'all', boxShadow: 'none' }}>
        <AccordionSummary>{customContent || title}</AccordionSummary>
        {hasDescription && !customContent && (
          <AccordionDetails>
            <div style={{ width: '100%', height: '100%' }}>
              {`${description.slice(0, 78)}${
                description.length > 78 ? '...' : ''
              }`}
            </div>
          </AccordionDetails>
        )}
      </Accordion>
      {customPointer || <TrianguleIcon fill={fill} />}
    </div>
  );
};

export default Tooltip;
