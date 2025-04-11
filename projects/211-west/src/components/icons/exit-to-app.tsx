import { SvgIcon, SvgIconProps } from '@evolutionv/vysta-ui';

type Props = SvgIconProps & {
  className?: string;
};

const ExitToAppIcon = ({ className, ...props }: Props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="white"
        d="M10.09 15.59 11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"
      ></path>
    </SvgIcon>
  );
};

export default ExitToAppIcon;
