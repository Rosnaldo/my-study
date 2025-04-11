import { Box, makeStyles } from '@material-ui/core';

interface ISpacer {
  width?: number | string;
  height?: number | string;
  className?: string;
}

export const Spacer = (props: ISpacer) => {
  return (
    <Box
      className={props.className}
      style={{
        width: props.width,
        height: props.height
      }}
    ></Box>
  );
};
