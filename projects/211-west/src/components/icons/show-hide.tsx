import { Box, BoxProps } from '@material-ui/core';

const style: Record<string, string> = {
  width: '5em',
  fontSize: '1em',
  padding: '0.4em 0 0.1em 0',
  textAlign: 'center',
  textTransform: 'uppercase',
  border: '1px solid #4CA1A5',
  borderRadius: '100px',
  color: '#4CA1A5 !important',
  letterSpacing: '0.1em'
};

export const Show = (props: BoxProps) => (
  <Box style={style} {...props}>
    {'< show'}
  </Box>
);

export const Hide = (props: BoxProps) => (
  <Box style={style} {...props}>
    {'hide >'}
  </Box>
);
