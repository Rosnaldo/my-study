import { SvgIcon, SvgIconProps, makeStyles } from '@evolutionv/vysta-ui';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.common.white,
    transform: 'rotate(180deg)',

    '& path, & rect': {
      fill: 'currentColor'
    }
  }
}));

type Props = SvgIconProps & {
  className?: string;
};

const ArrowLeftIcon = ({ className, ...props }: Props) => {
  const classes = useStyles();

  return (
    <SvgIcon
      width="71"
      height="70"
      viewBox="0 0 71 70"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx(classes.icon, className)}
    >
      <g clipPath="url(#clip0_4_58)">
        <path d="M23.3667 48.3875L36.725 35L23.3667 21.6125L27.4792 17.5L44.9792 35L27.4792 52.5L23.3667 48.3875Z" />
      </g>
      <defs>
        <clipPath id="clip0_4_58">
          <rect
            width="70"
            height="70"
            transform="translate(0.5 70) rotate(-90)"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default ArrowLeftIcon;
