import { Drawer, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menuDrawerPaper: {
    background: 'transparent'
  },
  backdrop: {
    opacity: '0 !important'
  },
  passthrough: {
    zindex: 0,
    pointerEvents: 'none'
  }
}));

export interface SlidingMenuProps {
  open: boolean;
  anchor?: 'left' | 'top' | 'right' | 'bottom';
  toggleButton?: React.ReactNode;
  children?: React.ReactNode | React.ReactNode[];
  onClose?: React.MouseEventHandler;
}

export function SlidingMenu({
  open,
  toggleButton,
  children,
  anchor = 'left',
  onClose
}: SlidingMenuProps) {
  const classes = useStyles();

  return (
    <>
      {toggleButton}
      <Drawer
        open={open}
        anchor={anchor}
        elevation={0}
        BackdropProps={{
          className: `${classes.backdrop} ${
            !onClose ? classes.passthrough : ''
          }`
        }}
        PaperProps={{
          className: classes.menuDrawerPaper,
          onClick: onClose
        }}
        onClose={onClose}
        className={`${!onClose ? classes.passthrough : ''}`}
      >
        {children}
      </Drawer>
    </>
  );
}
