import { Box, makeStyles } from '@evolutionv/vysta-ui';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import clsx from 'clsx';
import { env } from '~/helpers/env';
import CloseIcon from '~/components/icons/close';

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '3.5rem',
    height: '3.5rem',
    margin: '1rem',

    '& svg': {
      color: 'currentColor',
      height: '100%',
      width: '100%'
    }
  }
}));

type Props = {
  onClick?: () => void;
  className?: string;
  xcolor?: string;
};

const CloseButton: React.FC<Props> = ({
  onClick,
  className,
  xcolor = 'white'
}) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (onClick) {
        e.stopPropagation();
        onClick();
        return;
      } else {
        navigate(-1);
      }
    },
    [onClick]
  );

  if (env.IS_COMPANION) return null;

  return (
    <Box onClick={handleClick} className={clsx(classes.button, className)}>
      <CloseIcon xcolor={xcolor} />
    </Box>
  );
};

export default CloseButton;
