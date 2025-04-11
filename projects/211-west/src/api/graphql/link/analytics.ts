import { HttpLink } from '@apollo/client';
import { env } from '~/helpers/env';

export const analyticsHttpLink = new HttpLink({
  uri: env.ANALYTICS_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  }
});
