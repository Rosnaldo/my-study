import { SvgIcon, SvgIconProps, makeStyles } from '@evolutionv/vysta-ui';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  icon: {}
}));

type Props = SvgIconProps & {
  className?: string;
};

const PoiIcon = ({ className, ...props }: Props) => {
  const classes = useStyles();

  return (
    <SvgIcon
      width="70"
      height="70"
      viewBox="0 0 70 70"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx(classes.icon, className)}
    >
      <rect
        x="1"
        y="1"
        width="68"
        height="68"
        rx="34"
        stroke="#E8E5E1"
        strokeWidth="2"
      />
      <rect x="1" y="1" width="68" height="68" rx="34" fill="#001E60" />
    </SvgIcon>
  );
};

export default PoiIcon;
