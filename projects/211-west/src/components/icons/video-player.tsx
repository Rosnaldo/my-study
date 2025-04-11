import { SvgIcon, SvgIconProps, makeStyles } from '@evolutionv/vysta-ui';
import clsx from 'clsx';
import { palette } from '~/providers/theme';

const useStyles = makeStyles((theme) => ({
  icon: {}
}));

type Props = SvgIconProps & {
  className?: string;
};

const VideoPlayerIcon = ({ className, ...props }: Props) => {
  const classes = useStyles();

  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      width="184"
      height="184"
      viewBox="0 0 184 184"
      fill="none"
      {...props}
      className={clsx(classes.icon, className)}
    >
      <path
        d="M92.0002 0.333008C41.4002 0.333008 0.333496 41.3997 0.333496 91.9997C0.333496 142.6 41.4002 183.666 92.0002 183.666C142.6 183.666 183.667 142.6 183.667 91.9997C183.667 41.3997 142.6 0.333008 92.0002 0.333008ZM73.6668 133.25V50.7497L128.667 91.9997L73.6668 133.25Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default VideoPlayerIcon;
