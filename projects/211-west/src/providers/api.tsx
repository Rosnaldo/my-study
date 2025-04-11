import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject
} from '@apollo/client';
import { CachePersistor, LocalForageWrapper } from 'apollo3-cache-persist';
import localForage from 'localforage';
import { useEffect, useState } from 'react';
import { client } from '../api/graphql';
import { cache } from '../api/graphql/cache';
import { env } from '../helpers/env';

type MaybeClient = ApolloClient<NormalizedCacheObject> | null;

let _client: MaybeClient = null;

export const getGraphqlClient = async (): Promise<
  ApolloClient<NormalizedCacheObject>
> => {
  const persist = new CachePersistor({
    cache,
    storage: new LocalForageWrapper(localForage),
    debug: env.DEBUG,
    maxSize: !localForage.supports(localForage.INDEXEDDB) && 4.5 * 1024 * 1024,
    trigger: 'write'
  });

  await persist.restore();

  _client = client;

  return client;
};

export const getClient = () => _client as ApolloClient<NormalizedCacheObject>;

interface IApiProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

export const ApiProvider = (props: IApiProviderProps) => {
  const [client, setClient] = useState<MaybeClient>(null);

  useEffect(() => {
    const run = async () => {
      const client = await getGraphqlClient();
      setClient(client);
    };
    run();
  }, []);

  if (!client) {
    return null;
  }

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
