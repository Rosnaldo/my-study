import { env } from '~/helpers/env';

export const CompanionOnly = ({ children }) => {
  if (env.IS_COMPANION) {
    return children;
  }
  return null;
};

export const ExceptCompanion = ({ children }) => {
  if (!env.IS_COMPANION) {
    return children;
  }
  return null;
};
