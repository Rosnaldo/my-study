import { Fade, Button } from '@evolutionv/vysta-ui';
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useCompanion } from '~/hooks/useCompanion';
import { IDevice, useDevices } from '~/hooks/useDevices';
import { Box, Typography, makeStyles } from '@material-ui/core';

type Props = {
  open: boolean;
  hideDevicesFromName?: string;
  onToggle?: () => void;
  className?: string;
};

export const DEVICE_TYPES = {
  companion: 'Companion',
  physical: 'Physical'
};

const useStyles = makeStyles((theme) => ({
  device: {
    backgroundColor: 'inherit',
    padding: '.2rem 1rem',
    '&.MuiButton-root': {
      maxWidth: 'fit-content',
      minWidth: 0,
      color: 'white'
    }
  }
}));

type DeviceType = keyof typeof DEVICE_TYPES;

type DeviceWithType = IDevice & { type: DeviceType };

export function DevicesList(props: Props) {
  const { open, className, hideDevicesFromName, onToggle } = props;
  const [{ devices }] = useDevices();
  const [
    { isConnected, companionConnection, physicalConnection },
    { send, connectCompanion, disconnectCompanion, connectPhysical }
  ] = useCompanion();
  const classes = useStyles();

  const handleConnection = useCallback(
    async (device: DeviceWithType) => {
      if (device.type === 'physical') {
        connectPhysical({
          deviceId: device.id,
          ip: device.ip,
          port: device.port
        });
        onToggle?.();
        return;
      }

      if (
        isConnected &&
        (device.id === companionConnection.deviceId ||
          device.id === companionConnection.ip)
      ) {
        await disconnectCompanion();
      }

      await connectCompanion({
        deviceId: device.id,
        ip: device.ip,
        port: device.port
      });

      await send('route-change', { pathname: '/home' });
      await send('screensaver-visibility', false);

      onToggle?.();
    },
    [
      isConnected,
      companionConnection,
      disconnectCompanion,
      connectCompanion,
      connectPhysical,
      send,
      onToggle
    ]
  );

  const options: DeviceWithType[] = useMemo(
    () =>
      devices.flatMap((device) => {
        const types = Object.keys(DEVICE_TYPES) as DeviceType[];
        const type = types.find((item) =>
          device.name.startsWith(DEVICE_TYPES[item])
        );

        if (!type) return [];

        if (
          hideDevicesFromName &&
          device.name.toLowerCase().includes(hideDevicesFromName.toLowerCase())
        )
          return [];

        const name = device.name.replace(`${DEVICE_TYPES[type]}:`, '').trim();
        const isConnected = device.id === physicalConnection.deviceId;

        return {
          ...device,
          name: isConnected ? `Connected: ${name}` : name,
          type
        };
      }),
    [devices, hideDevicesFromName, companionConnection, physicalConnection]
  );

  return (
    <>
      {open ? (
        <Fade in={open}>
          <Box className={clsx(className)}>
            {!options.length && (
              <Button disabled className="no-devices">
                No devices found
              </Button>
            )}

            {options.map((device) => (
              <Button
                key={device.id}
                size="small"
                className={clsx(
                  {
                    connected:
                      isConnected && companionConnection.deviceId === device.id
                  },
                  classes.device
                )}
                onClick={() => handleConnection(device)}
              >
                <Typography className={classes.device}>
                  {device.name}
                </Typography>
              </Button>
            ))}
          </Box>
        </Fade>
      ) : null}
    </>
  );
}
