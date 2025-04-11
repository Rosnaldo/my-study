import { SvgIcon, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    fill: 'none',
    color: theme.palette.success.main,
    width: '3em',
    height: '3em',

    '& path': {
      fill: 'currentColor'
    }
  }
}));

type Props = {
  className?: string;
};

const CheckCircleIcon: React.FC<Props> = ({ className }) => {
  const classes = useStyles();

  return (
    <SvgIcon
      width="76"
      height="76"
      viewBox="0 0 76 76"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(classes.root, className)}
    >
      <path d="M38.036 0.485474C17.4118 0.485474 0.605469 17.2918 0.605469 37.916C0.605469 58.5402 17.4118 75.3465 38.036 75.3465C58.6602 75.3465 75.4665 58.5402 75.4665 37.916C75.4665 17.2918 58.6602 0.485474 38.036 0.485474ZM55.9278 29.307L34.7047 50.5301C34.1806 51.0541 33.4695 51.3535 32.7208 51.3535C31.9722 51.3535 31.2611 51.0541 30.737 50.5301L20.1442 39.9372C19.0587 38.8517 19.0587 37.0551 20.1442 35.9696C21.2297 34.8841 23.0263 34.8841 24.1118 35.9696L32.7208 44.5786L51.9601 25.3393C53.0456 24.2538 54.8423 24.2538 55.9278 25.3393C57.0133 26.4248 57.0133 28.1841 55.9278 29.307Z" />
    </SvgIcon>
  );
};

export default CheckCircleIcon;
