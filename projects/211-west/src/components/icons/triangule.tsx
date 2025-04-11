import { SvgIcon } from '@material-ui/core';

type Props = {
  className?: string;
};

const TrianguleIcon: React.FC<Props> = ({}) => {
  return (
    <SvgIcon width="48" height="24" viewBox="0 0 48 24" fill="none">
      <path d="M0 0L24 24L48 0H0Z" fill="#001E60" />
    </SvgIcon>
  );
};

export default TrianguleIcon;
