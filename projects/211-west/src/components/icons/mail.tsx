import { makeStyles, SvgIcon } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {},
  path: {
    stroke: 'currentColor',
    strokeWidth: 0.2
  }
}));

type Props = {
  className?: string;
  width?: string;
  height?: string;
};

const MailIcon: React.FC<Props> = ({ className, width, height }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      className={clsx(classes.root, className)}
      width={width || '18'}
      height={height || '18'}
      viewBox="0 0 18 18"
    >
      <g clip-path="url(#clip0_1542_11538)" fill="white">
        <path
          d="M16.125 2.96533H1.875C1.04657 2.96533 0.375 3.6369 0.375 4.46533V13.4653C0.375 14.2938 1.04657 14.9653 1.875 14.9653H16.125C16.9534 14.9653 17.625 14.2938 17.625 13.4653V4.46533C17.625 3.6369 16.9534 2.96533 16.125 2.96533Z"
          stroke="#03202F"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M17.1829 3.40186L8.99966 10.0904L0.816406 3.40186"
          stroke="#03202F"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1542_11538">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default MailIcon;
