import { ArgumentType } from 'node-osc';
import { useMemo } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { debug } from '~/helpers/debug';
import { env } from '~/helpers/env';
import * as storage from '~/helpers/storage';

// STORE DEFINITIONS

export interface ICompanionConnection {
  deviceId: string | null;
  ip: string | null;
  port: string | null;
}

export interface ICompanionStore {
  companionConnection: ICompanionConnection;
  modelConnection: ICompanionConnection;
  tableConnection: ICompanionConnection;
  physicalConnection: ICompanionConnection;
  isConnected: boolean;
}

export const companionStore = proxy<ICompanionStore>({
  companionConnection: {
    deviceId: null,
    ip: env.IS_COMPANION ? 'localhost' : null,
    port: env.IS_COMPANION ? '0' : null
  },
  modelConnection: JSON.parse(
    storage.getItem('model-connection') || 'null'
  ) || {
    deviceId: null,
    ip: env.IS_COMPANION ? 'localhost' : null,
    port: env.IS_COMPANION ? '0' : null
  },
  tableConnection: JSON.parse(
    storage.getItem('table-connection') || 'null'
  ) || {
    deviceId: null,
    ip: env.IS_COMPANION ? 'localhost' : null,
    port: env.IS_COMPANION ? '0' : null
  },
  physicalConnection: {
    deviceId: null,
    ip: env.IS_COMPANION ? 'localhost' : null,
    port: env.IS_COMPANION ? '0' : null
  },
  isConnected: false
});

// STORE UPDATE FUNCTIONS

function setIsConnected(value: boolean) {
  companionStore.isConnected = value;
}

async function connectCompanion(
  connection: ICompanionConnection
): Promise<void> {
  if (!env.IS_COMPANION) {
    companionStore.companionConnection = connection;
  }
}

async function connectModel(connection: ICompanionConnection): Promise<void> {
  if (!env.IS_COMPANION) {
    companionStore.modelConnection = connection;
    storage.setItem('model-connection', JSON.stringify(connection));
  }
}

async function connectTable(connection: ICompanionConnection): Promise<void> {
  if (!env.IS_COMPANION) {
    companionStore.tableConnection = connection;
    storage.setItem('table-connection', JSON.stringify(connection));
  }
}

function connectPhysical(connection: ICompanionConnection) {
  if (!env.IS_COMPANION) {
    companionStore.physicalConnection = connection;
  }
}

async function disconnectCompanion(): Promise<void> {
  if (!env.IS_COMPANION) {
    companionStore.companionConnection = {
      deviceId: null,
      ip: null,
      port: null
    };
  }
}

async function disconnectModel(): Promise<void> {
  if (!env.IS_COMPANION) {
    companionStore.modelConnection = {
      deviceId: null,
      ip: null,
      port: null
    };
    storage.removeItem('model-connection');
  }
}

async function disconnectTable(): Promise<void> {
  if (!env.IS_COMPANION) {
    companionStore.tableConnection = {
      deviceId: null,
      ip: null,
      port: null
    };

    storage.removeItem('table-connection');
  }
}

function disconnectPhysical() {
  if (!env.IS_COMPANION) {
    companionStore.physicalConnection = {
      deviceId: null,
      ip: null,
      port: null
    };
  }
}

// HELPER FUNCTIONS

async function send<T>(type: string, payload?: T): Promise<void> {
  const { ip, port } = companionStore.companionConnection;
  if (!env.IS_COMPANION && ip && port) {
    const url = new URL(`http://${ip}:${port}/message`).toString();
    await fetch(url, {
      method: 'post',
      body: JSON.stringify({ type, payload })
    });
  }
}

async function sendUdp(
  path: string,
  to: 'model' | 'table',
  ...data: Array<ArgumentType>
): Promise<void> {
  const { ip, port } = companionStore.companionConnection;

  if (!env.IS_COMPANION && ip && port) {
    const url = new URL(`http://${ip}:${port}/udp-message`).toString();

    const model =
      to === 'model'
        ? companionStore.modelConnection
        : companionStore.tableConnection;

    const messageType = to === 'model' ? 'osc' : 'raw';

    console.log(
      `Sending message to ${to} at ${model.ip}:${
        model.port
      }...\nMessage: ${JSON.stringify({ address: path, data }, null, 2)}`
    );

    await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        path,
        data,
        messageType,
        model
      })
    });
  }
}

async function sendTcp(message: string): Promise<void> {
  if (env.IS_COMPANION) return;

  const { ip, port } = companionStore.companionConnection;
  const device = companionStore.physicalConnection;

  if (ip && port && device.ip && device.port) {
    const url = new URL(`http://${ip}:${port}/tcp-message`).toString();

    console.log(
      `Sending message to physical at ${device.ip}:${device.port}...\nMessage: ${message}`
    );

    await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        message,
        device
      })
    });
  }
}

function on<T>(type: string, callback: (event, value: T) => void): () => void {
  return window.electronAPI.onMessage<T>((event, value) => {
    if (value.type === type) {
      debug(`useCompanion.on("${type}")`, value.payload);
      return callback(event, value.payload);
    }
  });
}

// HOOK

export function useCompanion() {
  const storeSnapshot = useSnapshot(companionStore);

  // MEMOIZE STORE AND FUNCTIONS INTO A CONTEXT
  const context = useMemo(
    () => [
      storeSnapshot,
      {
        connectCompanion,
        connectModel,
        connectTable,
        connectPhysical,
        disconnectCompanion,
        disconnectModel,
        disconnectTable,
        disconnectPhysical,
        setIsConnected,
        send,
        sendUdp,
        sendTcp,
        on
      }
    ],
    [storeSnapshot]
  );

  return context as [
    ICompanionStore,
    {
      connectCompanion: typeof connectCompanion;
      connectModel: typeof connectModel;
      connectTable: typeof connectTable;
      connectPhysical: typeof connectPhysical;
      disconnectCompanion: typeof disconnectCompanion;
      disconnectModel: typeof disconnectModel;
      disconnectTable: typeof disconnectTable;
      disconnectPhysical: typeof disconnectPhysical;
      setIsConnected: typeof setIsConnected;
      send: typeof send;
      sendUdp: typeof sendUdp;
      sendTcp: typeof sendTcp;
      on: typeof on;
    }
  ];
}

// HELPER FUNCTIONS

export const sendToCompanion: typeof send = async (...args) => {
  try {
    await send(...args);
  } catch (error) {
    console.error('ERROR SENDING MESSAGE TO COMPANION', error);
  }
};
