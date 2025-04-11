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

const ConnectIcon = ({ className, ...rest }: SvgIconProps) => {
  const classes = useStyles();

  return (
    <SvgIcon
      viewBox="0 0 56 47"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M54.5769 36.1154C54.5769 37.3899 53.5437 38.4231 52.2692 38.4231H3.80769C2.53319 38.4231 1.5 37.3899 1.5 36.1154V3.80769C1.5 2.53319 2.53319 1.5 3.80769 1.5H52.2692C53.5437 1.5 54.5769 2.53319 54.5769 3.80769V36.1154Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 45.3462H39.5769"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.5769 38.4231V45.3462"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.5 38.4231V45.3462"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="28.0385"
        cy="28.0385"
        r="3.46154"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M35.7138 20.2362C31.1768 16.7912 24.9002 16.7912 20.3631 20.2362"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.8846 13.0385V13.0385C33.6795 6.88462 22.3975 6.88462 14.1923 13.0385V13.0385"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default ConnectIcon;
