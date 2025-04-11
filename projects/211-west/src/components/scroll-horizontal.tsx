import { Box, IconButton, makeStyles } from '@evolutionv/vysta-ui';
import ArrowLeftCustomer from './icons/arrow-left';
import ArrowRightCustomer from './icons/arrow-right';
import scrollHorizontal from '@evolutionv/vysta-ui/.build/v2/util/scroll/horizontal';

const useStyles = makeStyles((theme) => ({
  scrollControls: ({
    showScrollControls
  }: {
    showScrollControls: boolean;
  }) => ({
    display: showScrollControls ? 'flex' : 'none',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& .MuiIconButton-root': {
      borderRadius: '0',
      padding: '0 1rem'
    }
  })
}));

const ScrollHorizontal: React.FC<{
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  show?: boolean;
}> = ({ containerRef, show = true }) => {
  const classes = useStyles({ showScrollControls: show });

  return (
    <Box className={classes.scrollControls}>
      <IconButton
        className={``}
        onClick={() => scrollHorizontal(containerRef, 'left')}
      >
        <ArrowLeftCustomer />
      </IconButton>
      <IconButton
        className={``}
        onClick={() => scrollHorizontal(containerRef, 'right')}
      >
        <ArrowRightCustomer />
      </IconButton>
    </Box>
  );
};

export default ScrollHorizontal;
