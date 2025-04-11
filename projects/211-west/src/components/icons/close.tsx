import { SvgIcon, SvgIconProps, makeStyles } from '@evolutionv/vysta-ui';
import clsx from 'clsx';
import { palette } from '~/providers/theme';

const useStyles = makeStyles((theme) => ({
  icon: {}
}));

type Props = SvgIconProps & {
  className?: string;
  xcolor: string;
};

const CloseIcon = ({ className, xcolor, ...props }: Props) => {
  const classes = useStyles();

  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      {...props}
      className={clsx(classes.icon, className)}
    >
      <path d="M17.3712 8.00879L7.30908 17.7054" stroke={xcolor} />
      <path d="M7.6748 7.90918L17.4722 17.3836" stroke={xcolor} />
    </SvgIcon>
  );
};

export default CloseIcon;
