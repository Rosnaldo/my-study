import { ApolloLink } from '@apollo/client';
import { analyticsHttpLink } from './analytics';
import { authLink } from './auth';
import { mediaHttpLink } from './media';
import { sageHttpLink } from './sage';

export const linkClient = new ApolloLink((operation, forward) => {
  const context = operation.getContext().client;

  if (context === 'media') {
    return authLink.concat(mediaHttpLink).request(operation, forward);
  }

  if (context === 'analytics') {
    return authLink.concat(analyticsHttpLink).request(operation, forward);
  }

  return authLink.concat(sageHttpLink).request(operation, forward);
});
