import { Fade, Box, Button, makeStyles } from '@evolutionv/vysta-ui';
import { VystaModelIcon } from '@evolutionv/vysta-ui/.build/icons';
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useCompanion } from '~/hooks/useCompanion';
import { IDevice, useDevices } from '~/hooks/useDevices';
import CastConnectPopover from './CastConnect';

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

type DeviceType = keyof typeof DEVICE_TYPES;

const useStyles = makeStyles((theme) => ({
  deviceIconContainer: {
    marginLeft: '1rem'
  }
}));

export function DevicesList(props: Props) {
  const classes = useStyles();
  const { open, className, hideDevicesFromName, onToggle } = props;
  const [{ devices }] = useDevices();
  const [
    { isConnected, companionConnection, physicalConnection },
    { send, connectCompanion, disconnectCompanion, connectPhysical }
  ] = useCompanion();

  const handleConnection = useCallback(
    async (deviceId: string) => {
      const device = options.find((item) => item.id === deviceId)!;
      onToggle?.();
      if (isConnected) {
        await disconnectCompanion();
      }

      await connectCompanion({
        deviceId: device.id,
        ip: device.ip,
        port: device.port
      });

      await send('route-change', { pathname: '/home' });
      await send('screensaver-visibility', false);
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

  const handleDisconnect = useCallback(async () => {
    await send('route-change', { pathname: '/home' });
    await send('screensaver-visibility', true);
    await disconnectCompanion();
  }, [send, disconnectCompanion]);

  const options = useMemo(
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
          label: `${name} (${type})`,
          icon: <VystaModelIcon />,
          type
        };
      }),
    [
      isConnected,
      devices,
      hideDevicesFromName,
      companionConnection,
      physicalConnection
    ]
  );

  return (
    <CastConnectPopover
      options={options}
      iconClassName={classes.deviceIconContainer}
      onSelect={(id) => handleConnection(id)}
      onDisconnect={handleDisconnect}
      selectedOptionId={companionConnection.deviceId}
      connectionStatus={isConnected ? 'connected' : 'disconnected'}
    />
  );
}
