import {
  alpha,
  Backdrop,
  Box,
  ButtonBase,
  Grid,
  IconButton,
  makeStyles,
  Slide,
  Typography
} from '@material-ui/core';
import { vh } from '~/helpers/style';
import SettingsIcon from '../icons/settings';
import { env } from '~/helpers/env';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 1000
  },
  drawer: {
    position: 'fixed',
    top: 0,
    right: 0,
    height: vh(100),
    width: 'max(30vw, 20em)',
    background: alpha(theme.palette.background.default, 0.7),
    color: theme.palette.getContrastText(theme.palette.background.default),
    zIndex: 2,
    padding: '3em 2em',

    '&>.MuiGrid-item': {
      width: '100%'
    },
    '& .MuiSvgIcon-root': {
      fill: theme.palette.background.default,
      color: theme.palette.background.default,
      width: '1.3em',
      height: '1.3em'
    }
  },
  verticalList: {
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: 10
  },
  icon: {
    marginRight: '1em',
    backgroundColor: theme.palette.background.paper
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '3em',
    width: '3em',
    padding: '0.5em',
    background: theme.palette.background.paper,
    borderRadius: '50%',
    marginRight: '1em'
  },
  version: {
    position: 'absolute',
    left: '10px',
    right: 'auto',
    top: 'auto',
    bottom: 0
  }
}));

export interface SettingsDrawerProps {
  open: boolean;
  options: Array<
    Array<{ label: string; icon: React.ReactNode; onClick: () => void }>
  >;
  onClose: React.MouseEventHandler<HTMLDivElement>;
}

export function SettingsDrawer({
  open,
  options,
  onClose
}: SettingsDrawerProps) {
  const classes = useStyles();

  return (
    <Backdrop open={open} onClick={onClose} className={classes.backdrop}>
      <Slide in={open} direction="left">
        <Grid
          container
          direction="column"
          wrap="nowrap"
          justifyContent="space-between"
          alignItems="flex-start"
          className={classes.drawer}
        >
          <Box className={classes.header}>
            <IconButton className={classes.icon}>
              <SettingsIcon />
            </IconButton>
            <Typography variant="h5">Settings</Typography>
          </Box>
          {options.map((sections, optionsIdx) => (
            <Grid
              item
              className={classes.verticalList}
              key={`drawer-${optionsIdx}`}
            >
              {sections.map((section, sectionIdx) => (
                <ButtonBase
                  onClick={section.onClick}
                  className={`${classes.button}`}
                  key={`drawer-${optionsIdx}-${sectionIdx}`}
                >
                  <Box className={`${classes.iconContainer}`}>
                    {section.icon}
                  </Box>
                  {section.label}
                </ButtonBase>
              ))}
            </Grid>
          ))}
          <Typography className={classes.version}>
            v{env.APP_VERSION}
          </Typography>
        </Grid>
      </Slide>
    </Backdrop>
  );
}
