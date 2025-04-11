import { makeStyles, SvgIcon, SvgIconProps } from '@material-ui/core';
import logo from '~/assets/211-west/logo.svg';
import logoSplash from '~/assets/211-west/logo-white.svg';
import logoWhite from '~/assets/211-west/logo-white.svg';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    stroke: 'transparent',
    color: 'transparent',
    strokeWidth: '1px',
    width: '40%'
  }
}));

const Splash = ({
  className = '',
  splashScreen = false,
  variant = 'default'
}: {
  className?: string;
  splashScreen?: boolean;
  variant?: 'default' | 'white';
}) => {
  const classes = useStyles();

  if (splashScreen)
    return <img src={logoSplash} className={clsx(classes.root, className)} />;

  return (
    <img
      src={variant === 'default' ? logo : logoWhite}
      className={clsx(classes.root, className)}
    />
  );
};

export default Splash;
