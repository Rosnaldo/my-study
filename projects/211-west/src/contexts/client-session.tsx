import { createContext, useEffect, useState } from 'react';
import { env } from '~/helpers/env';
import { Client, useGetClientLazyQuery } from '~/api';
import { getItem, removeItem, setItem } from '~/helpers/storage';
import { useLogged } from '~/hooks/useLogged';

interface ClientSessionContextValue {
  client: Client | null;
  startSession: (clientId: string) => void;
  endSession: () => void;
  refetchClient: () => void;
}

const CLIENT_ITEM_NAME = 'client-session';

export const ClientSessionContext = createContext<ClientSessionContextValue>({
  client: null,
  startSession: () => {},
  endSession: () => {},
  refetchClient: () => {}
});

export const ClientSessionProvider: React.FC = ({ children }) => {
  const [clientId, setClientId] = useState<string | null>(
    getItem(CLIENT_ITEM_NAME)
  );
  const [client, setClient] = useState<Client | null>(null);
  const { loggedInAgentId } = useLogged();
  const [getClient] = useGetClientLazyQuery({
    fetchPolicy: 'cache-and-network'
  });

  const fetchClient = async () => {
    if (!clientId) {
      setClient(null);
      return;
    }

    const clientData = await getClient({
      variables: {
        applicationId: env.APPLICATION_ID,
        agentId: loggedInAgentId,
        id: clientId || ''
      }
    });

    const client = clientData?.data?.client || null;

    setClient(client);
  };

  useEffect(() => {
    fetchClient();
  }, [clientId]);

  const startSession = (clientId: string) => {
    setItem(CLIENT_ITEM_NAME, clientId);
    setClientId(clientId);
  };

  const endSession = () => {
    removeItem(CLIENT_ITEM_NAME);
    setClientId(null);

    if (!client?.id) {
      return;
    }
  };

  const clientSessionContext: ClientSessionContextValue = {
    client,
    startSession,
    endSession,
    refetchClient: fetchClient
  };

  return (
    <ClientSessionContext.Provider value={clientSessionContext}>
      {children}
    </ClientSessionContext.Provider>
  );
};
