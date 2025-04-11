import { SvgIcon } from '@material-ui/core';

type Props = {
  className?: string;
};
const FullscreenIcon = (props: Props) => {
  return (
    <SvgIcon viewBox="0 0 77 77" width="77" height="77" fill="none" {...props}>
      <g clipPath="url(#clip0_10_11085)">
        <path
          d="M9.51318 15.8558V28.5401H15.8553V15.8558H28.5396V9.51367H15.8553C12.3672 9.51367 9.51318 12.3676 9.51318 15.8558ZM15.8553 47.5666H9.51318V60.2509C9.51318 63.7391 12.3672 66.593 15.8553 66.593H28.5396V60.2509H15.8553V47.5666ZM60.2504 60.2509H47.5661V66.593H60.2504C63.7386 66.593 66.5926 63.7391 66.5926 60.2509V47.5666H60.2504V60.2509ZM60.2504 9.51367H47.5661V15.8558H60.2504V28.5401H66.5926V15.8558C66.5926 12.3676 63.7386 9.51367 60.2504 9.51367Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_10_11085">
          <rect width="76.1058" height="76.1058" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default FullscreenIcon;
