import { setContext } from '@apollo/client/link/context';
import { env } from '~/helpers/env';
import { getCacheSnapshot } from '~/hooks/useCache';
import { CacheKeys } from '~/hooks/useCache/keys';

export const authLink = setContext((_, { headers }) => {
  let accessToken: string;

  switch (true) {
    case !!env.IS_COMPANION:
      accessToken = `${env.COMPANION_TOKEN}_${env.APPLICATION_ID}`;
      break;
    case !!env.IS_COSTUMER_VIEW:
      accessToken = `${env.CUSTOMER_TOKEN}_${env.APPLICATION_ID}`;
      break;
    default:
      accessToken = getCacheSnapshot()[CacheKeys.ACCESS_TOKEN] as string;
      break;
  }
  const headerName =
    env.IS_COMPANION || env.IS_COSTUMER_VIEW ? 'Token' : 'Authorization';
  //TODO replicate the logic and envs from companion to customer
  const requestHeaders = {
    ...headers,
    [headerName]: accessToken ? `${accessToken}` : ''
  };

  return {
    headers: requestHeaders
  };
});
