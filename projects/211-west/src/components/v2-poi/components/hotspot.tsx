import { makeStyles } from '@material-ui/core';
import { MouseEventHandler } from 'react';

type PropStyle = {
  top: number;
  left: number;
};

const useStyles = makeStyles(() => ({
  hotSpot: ({ top, left }: PropStyle) => ({
    cursor: 'pointer',
    position: 'absolute',
    top: `${top}%`,
    left: `${left}%`,
    zIndex: 2
  }),
  letter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -45%)',
    margin: 0,
    fontSize: '1rem',
    color: '#fff',
    zIndex: 3
  },
  svg: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2
  }
}));

type Props = {
  top: number;
  left: number;
  letter: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  onMouseEnter: MouseEventHandler<HTMLDivElement>;
  backgroundColor: string;
};

const HotSpot = ({
  top,
  left,
  letter,
  onClick,
  onMouseEnter,
  backgroundColor
}: Props) => {
  const classes = useStyles({ top, left });

  return (
    <div
      className={classes.hotSpot}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <p className={classes.letter}>{letter}</p>
      <svg
        className={classes.svg}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="15"
          stroke="#fffff"
          strokeWidth="1"
        />
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="15"
          fill={backgroundColor}
        />
      </svg>
    </div>
  );
};

export default HotSpot;
