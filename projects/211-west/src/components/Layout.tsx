import { Box, Theme, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { env } from '../helpers/env';
import { PropsWithChildren } from 'react';

const useStyles = makeStyles<Theme>(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    background: 'black'
  },
  mainContent: {
    flex: '1',
    overflowY: 'auto',

    '& > div': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }
  }
}));

export interface LayoutProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export function Layout({ children, className = '' }: LayoutProps) {
  const classes = useStyles();

  if (env.IS_COMPANION) return <>{children}</>;
  return (
    <Box className={clsx(classes.root, className)}>
      <Box className={classes.mainContent}>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

const ExceptSimple: React.FC<PropsWithChildren<{ simple: boolean }>> = ({
  children,
  simple
}) => (simple ? null : <>{children}</>);
