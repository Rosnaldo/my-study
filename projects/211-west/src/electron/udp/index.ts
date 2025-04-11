import { ArgumentType } from 'node-osc';
import * as OSC from './osc';
import * as RAW from './raw';

export type UDPMessageType = 'raw' | 'osc';

export async function sendMessage<T>(
  messageType: UDPMessageType,
  ip: string,
  port: string,
  path: string,
  data?: T
): Promise<void> {
  switch (messageType) {
    case 'osc':
      return OSC.sendMessage(
        ip,
        port,
        path,
        (data || []) as Array<ArgumentType>
      );
    case 'raw':
      return RAW.sendMessage(ip, port, path);
  }
}
