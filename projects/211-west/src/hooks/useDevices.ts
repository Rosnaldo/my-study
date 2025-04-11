import { useMemo } from 'react';
import { ListDevicesQuery, useConnectDeviceMutation } from '../api';
import { env } from '../helpers/env';
import { useContentLoad } from './useContentLoad';
import { useDevicesStore } from '~/store/devices';

// TYPE DEFINITIONS

export interface IDevice {
  name: string;
  id: string;
  ip: string;
  port: string;
}

// HOOK

export function useDevices() {
  const { updateDevicesContent } = useContentLoad();
  const [connectDevice] = useConnectDeviceMutation();
  const devices = useDevicesStore((state) => state.devices);
  const updateDeviceAddress = async (
    deviceId: string,
    ip: string,
    port: string
  ): Promise<void> => {
    await connectDevice({
      variables: {
        input: {
          applicationId: env.APPLICATION_ID,
          id: deviceId,
          connectionId: `${ip}:${port}`
        }
      }
    });
    await updateDevicesContent();
  };

  const context = useMemo(
    () => [
      {
        devices: [
          ...devices,
          env.DEBUG
            ? {
                id: '1',
                name: 'Companion: Local',
                ip: 'localhost',
                port: 8088
              }
            : []
        ].flat()
      },
      { updateDeviceAddress }
    ],
    [devices]
  );

  return context as [
    { devices: typeof devices },
    { updateDeviceAddress: typeof updateDeviceAddress }
  ];
}

// HELPER FUNCTIONS

export function parseDevices(data?: ListDevicesQuery): IDevice[] {
  return (
    data?.devices?.flatMap((device) => {
      const id = device?.id;
      const name = device?.name;
      const [ip, port] = device?.connectionId?.split(':') || [];

      if (!id || !name || !ip || !port) return [];

      return { id, ip, name, port };
    }) || []
  );
}
