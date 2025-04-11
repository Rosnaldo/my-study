import { SvgIcon } from '@material-ui/core';

type Props = {
  fill?: string;
};

const TrianguleIcon: React.FC<Props> = ({ fill }) => {
  return (
    <SvgIcon width="48" height="24" viewBox="0 0 48 24" fill="none">
      <path d="M0 0L24 24L48 0H0Z" fill={fill} />
    </SvgIcon>
  );
};

export default TrianguleIcon;
