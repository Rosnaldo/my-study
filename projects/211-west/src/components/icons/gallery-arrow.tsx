import { makeStyles, SvgIcon } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {},
  path: {
    stroke: 'currentColor',
    strokeWidth: 0.6
  }
}));

type Props = {
  className?: string;
  width?: string;
  height?: string;
  fill?: string;
  onClick?: () => void;
};

const GalleryArrow: React.FC<Props> = ({
  className,
  width,
  height,
  fill,
  onClick
}) => {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(classes.root, className)}
      width={width ?? '24'}
      height={height ?? '24'}
      viewBox="0 0 100 100"
      onClick={onClick}
    >
      <circle cx="50" cy="50" r="49" stroke="#001E60" stroke-width="2" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M71.1605 50.8155H26.229V48.8155H71.1605L54.2006 31.8556L55.6148 30.4414L74.2818 49.1084L74.9889 49.8155L74.2818 50.5226L55.6148 69.1896L54.2006 67.7754L71.1605 50.8155Z"
        fill="#001E60"
      />
    </SvgIcon>
  );
};

export default GalleryArrow;
