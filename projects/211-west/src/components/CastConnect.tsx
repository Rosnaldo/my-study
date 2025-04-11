import {
  Box,
  IconButton,
  Popover,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';
import CastConnectedIcon from '@material-ui/icons/CastConnected';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { VystaDisconnectIcon } from '@evolutionv/vysta-ui/.build/icons';
import { Theme } from '@evolutionv/vysta-ui';
import { palette } from '~/providers/theme';

type ConnectionStatus = 'connected' | 'disconnected' | 'partial-connected';
export interface CastConnectPopover {
  options: { label: string; id: string; icon?: React.ReactNode }[];
  onSelect: (id: string) => void;
  onDisconnect: () => void;
  className?: string;
  iconClassName?: string;
  selectedOptionId?: string | null;
  connectionStatus?: ConnectionStatus;
}

const useStyles = makeStyles<
  Theme,
  {
    selectedOptionId?: string | null;
    connectionColor?: string;
  }
>((theme) => ({
  button: {
    padding: 0,
    fontSize: '1em',

    '& #Sage-cast-connect-button-icon': {
      color: ({ selectedOptionId, connectionColor }) => 'white'
    }
  },

  root: {
    marginTop: '1em',

    '& .MuiPaper-root': {
      borderRadius: '1em'
    }
  },
  container: {
    width: '20rem',
    padding: '1em',
    background: theme.palette.common.white
  },
  title: {
    color: theme.palette.background.paper,
    fontWeight: 700,
    textAlign: 'center'
  },
  optionButton: {
    width: '100%',
    '& .MuiButton-label': {
      fontWeight: 600,
      color: theme.palette.background.paper
    }
  },
  connectedOptionId: () => ({
    '& .MuiButton-label, .MuiButton-label svg': {
      fill: palette.paper
    }
  }),
  optionsContainer: {
    marginTop: '1em'
  },
  selectedOptionId: {
    '& span': {
      color: 'green'
    }
  }
}));

export const CastConnectPopover = ({
  options,
  className = '',
  onSelect,
  onDisconnect,
  selectedOptionId,
  connectionStatus = 'disconnected',
  iconClassName
}: CastConnectPopover) => {
  const connectinoStatusColorMap = {
    connected: palette.paper,
    disconnected: palette.paper,
    'partial-connected': palette.paper
  };
  const classes = useStyles({
    selectedOptionId,
    connectionColor: connectinoStatusColorMap[connectionStatus]
  });
  const inputRef = useRef(null);
  const [isConnectCastOpen, setIsConnectCastOpen] = useState(false);
  const handleToggleConnectCast = () =>
    setIsConnectCastOpen(!isConnectCastOpen);

  return (
    <>
      <IconButton
        ref={inputRef}
        onClick={handleToggleConnectCast}
        className={clsx(
          'Sage-cast-connect-button',
          classes.button,
          iconClassName
        )}
      >
        <CastConnectedIcon id="Sage-cast-connect-button-icon" />
      </IconButton>
      <Popover
        className={clsx('Sage-cast-connect-root', classes.root, className)}
        open={isConnectCastOpen}
        anchorEl={inputRef.current}
        onClose={handleToggleConnectCast}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        transformOrigin={{ horizontal: 'center', vertical: 'bottom' }}
      >
        <Box className={clsx('Sage-cast-connect-container', classes.container)}>
          <Typography className={classes.title}>CONNECT TO:</Typography>
          <Box
            className={clsx(
              'Sage-cast-connect-options-container',
              classes.optionsContainer
            )}
          >
            {options.map((option) => (
              <Button
                key={option.id}
                variant="text"
                startIcon={option.icon}
                className={clsx(
                  classes.optionButton,
                  classes.connectedOptionId,
                  selectedOptionId === option.id
                    ? classes.selectedOptionId
                    : null
                )}
                onClick={() => onSelect(option.id)}
              >
                <span>{option.label}</span>
              </Button>
            ))}
            {connectionStatus === 'connected' && (
              <Button
                variant="text"
                startIcon={<VystaDisconnectIcon />}
                className={classes.optionButton}
                onClick={onDisconnect}
              >
                Disconnect
              </Button>
            )}
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default CastConnectPopover;
