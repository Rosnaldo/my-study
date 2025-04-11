import { useEffect } from 'react';
import { env } from '~/helpers/env';
import { useCompanion } from '~/hooks/useCompanion';
import { useDevices } from '~/hooks/useDevices';
import { DEVICE_TYPES } from '~/components/devices-list';

const PhysicalAutoConnection: React.FC = () => {
  const [{ physicalConnection }, { connectPhysical }] = useCompanion();
  const [{ devices }] = useDevices();

  useEffect(() => {
    if (env.IS_COMPANION) return;
    if (physicalConnection.deviceId) return;

    const physicalDevice = devices.find((device) =>
      device.name.startsWith(DEVICE_TYPES.physical)
    );
    if (!physicalDevice) return;

    console.log('[Physical device] Auto connecting...');

    connectPhysical({
      deviceId: physicalDevice.id,
      ip: physicalDevice.ip,
      port: physicalDevice.port
    });

    console.log('[Physical device] Auto connected successfully.');
  }, [physicalConnection, devices]);

  return null;
};

export default PhysicalAutoConnection;
