import { Box, makeStyles } from '@material-ui/core';
import { PropsWithChildren } from 'react';

type StyleProps = {
  height: string;
};

const useStyles = makeStyles((theme) => ({
  wrapperContainer: ({ height }: StyleProps) => ({
    width: '100%',
    height,
    position: 'relative'
  }),
  wrapperChild: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
}));

export const Wrapper: React.FC<PropsWithChildren<{ height?: string }>> = ({
  children,
  height = '100%'
}) => {
  const classes = useStyles({ height });
  return (
    <Box className={classes.wrapperContainer}>
      <Box className={classes.wrapperChild}>{children}</Box>
    </Box>
  );
};
