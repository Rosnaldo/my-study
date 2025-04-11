import { HttpLink } from '@apollo/client';
import { env } from '~/helpers/env';

export const mediaHttpLink = new HttpLink({
  uri: env.MEDIA_GRAPHQL_API,
  headers: {
    'x-api-key': env.MEDIA_GRAPHQL_API_KEY
  }
});
