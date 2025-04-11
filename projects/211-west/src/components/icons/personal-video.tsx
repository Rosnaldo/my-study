import { SvgIcon, SvgIconProps } from '@evolutionv/vysta-ui';

type Props = SvgIconProps & {
  className?: string;
};

const PersonalVideoIcon = ({ className, ...props }: Props) => {
  return (
    <SvgIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="white"
        d="M21 3H3c-1.11 0-2 .89-2 2v12c0 1.1.89 2 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5c0-1.11-.9-2-2-2m0 14H3V5h18z"
      ></path>
    </SvgIcon>
  );
};

export default PersonalVideoIcon;
