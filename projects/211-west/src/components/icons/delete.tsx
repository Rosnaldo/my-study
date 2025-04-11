import { SvgIcon, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.background.paper,
    fill: 'none',

    '& path': {
      stroke: 'currentColor'
    }
  }
}));

type Props = {
  className?: string;
};

const DeleteIcon: React.FC<Props> = ({ className }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      width="56"
      height="57"
      viewBox="0 0 56 57"
      className={clsx(classes.root, className)}
    >
      <path
        d="M47.1494 9.35059V52.1552C47.1494 52.7527 46.9121 53.3257 46.4896 53.7482C46.0671 54.1707 45.4941 54.4081 44.8966 54.4081H11.1035C10.506 54.4081 9.93293 54.1707 9.51044 53.7482C9.08794 53.3257 8.85059 52.7527 8.85059 52.1552V9.35059"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8623 9.35042V4.84467C17.8623 4.24717 18.0997 3.67414 18.5222 3.25165C18.9447 2.82915 19.5177 2.5918 20.1152 2.5918H35.8853C36.4828 2.5918 37.0558 2.82915 37.4783 3.25165C37.9008 3.67414 38.1382 4.24717 38.1382 4.84467V9.35042"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.0918 9.35059H53.9079"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.8623 17.2358V44.2703"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 17.2358V44.2703"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M38.1377 17.2358V44.2703"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default DeleteIcon;
