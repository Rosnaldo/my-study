import { makeStyles, SvgIcon, SvgIconProps } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    stroke: '#fff',
    fill: 'transparent',
    color: 'transparent',
    strokeWidth: '2px'
  }
}));

const ThumbnailArrowIcon = ({ className, ...rest }: SvgIconProps) => {
  const classes = useStyles();

  return (
    <SvgIcon
      width="102"
      height="104"
      viewBox="0 0 102 104"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <g filter="url(#filter0_d_4712_6462)">
        <rect x="12" y="8" width="80" height="80" rx="40" fill="white" />
        <path
          d="M40 63.3L55.2667 48L40 32.7L44.7 28L64.7 48L44.7 68L40 63.3Z"
          fill="#001E60"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_4712_6462"
          x="0"
          y="0"
          width="104"
          height="104"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4712_6462"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4712_6462"
            result="shape"
          />
        </filter>
      </defs>
    </SvgIcon>
  );
};

export default ThumbnailArrowIcon;
