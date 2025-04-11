import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Agent,
  GetAgentQuery,
  getAuthHeaders,
  LoginWithPinMutationVariables,
  Maybe,
  removeAuthHeaders,
  setAuthHeaders,
  useGetAgentLazyQuery,
  useLoginWithPinMutation
} from '~/api';
import { useCache } from '~/hooks/useCache';
import { CacheKeys } from '~/hooks/useCache/keys';
import { env } from '~/helpers/env';
import { cacheStore } from './useCache/store';

export const AGENT_ID = '45256c2b-80e2-440b-b948-0871f5526b3a';

const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE1NmI0ZDIyLWY2MTgtNDMzNi04NjRmLTIyOWZkNDlhMGEwNCIsImRhdGEiOnsiaWQiOiIxNTZiNGQyMi1mNjE4LTQzMzYtODY0Zi0yMjlmZDQ5YTBhMDQiLCJmaXJzdE5hbWUiOiJFdm9sdXRpb24iLCJsYXN0TmFtZSI6IlZpcnR1YWwiLCJlbWFpbCI6InFhQGV2b2x1dGlvbnYuY29tIiwiYXBwbGljYXRpb25JZCI6IjlhMmUzMTdkLWUxMTgtNGQ4OC1hNjNlLTIwNTAxMDdjZGUyOSJ9LCJpYXQiOjE2NjM5NTgxMTl9.pxE4ekwOz2hKWeBtTZ01LONVOiQcPLZ6q0fDq-DQgMc';

export function useLogged() {
  const navigate = useNavigate();

  const [loggedInAgentId, setLoggedInAgentId] = useState<Maybe<string>>(null);
  const [loggedInAgent, setLoggedInAgent] = useCache<Agent>(
    CacheKeys.LOGGED_IN_AGENT
  );
  const [isLogged, setIsLogged] = useCache<boolean>(CacheKeys.LOGGED);
  const [, setAccessToken] = useCache<Maybe<string>>(CacheKeys.ACCESS_TOKEN);

  const [loginWithPin, { loading }] = useLoginWithPinMutation();
  const [getAgent, { refetch }] = useGetAgentLazyQuery();

  useEffect(() => {
    if (env.IS_COMPANION && !isLogged) {
      setAuthHeaders({
        accessToken,
        refreshToken: '' as string
      });
      setAccessToken(accessToken);
      setLoggedInAgentId(AGENT_ID);
      setIsLogged(true);

      navigate('/home', { replace: true });
    }
  }, []);

  useEffect(() => {
    if (loggedInAgent?.id) {
      setLoggedInAgentId(loggedInAgent?.id);
    }
  }, [loggedInAgent]);

  useEffect(() => {
    async function fetchAgent() {
      if (
        !loggedInAgent &&
        !!loggedInAgentId &&
        !!getAuthHeaders().accessToken
      ) {
        const { data: getAgentData } = await getAgent({
          variables: {
            id: loggedInAgentId,
            applicationId: env.APPLICATION_ID
          }
        });
        updateAgent(getAgentData);
      }
    }

    fetchAgent();
  }, [loggedInAgent, loggedInAgentId]);

  const updateAgent = (getAgentData: GetAgentQuery | undefined) => {
    if (!!getAgentData) {
      setLoggedInAgent(getAgentData?.agent as Maybe<Agent>);
    }
  };

  return {
    setLoggedInAgent,
    loginAgent: async ({
      pin,
      userId
    }: Omit<LoginWithPinMutationVariables, 'applicationId'>) => {
      const result = await loginWithPin({
        variables: { applicationId: env.APPLICATION_ID, pin: '1234', userId }
      });
      if (result.data?.loginWithPin?.__typename === 'LoginSuccess') {
        const accessToken = result.data?.loginWithPin?.token as string;

        setAuthHeaders({
          accessToken,
          refreshToken: '' as string
        });
        setAccessToken(accessToken);
        setLoggedInAgentId(userId);
        setIsLogged(true);
        navigate('/home');
      } else {
        throw new Error('Invalid login');
      }

      return result;
    },
    logoutAgent: () => {
      removeAuthHeaders();
      setLoggedInAgent(null);
      setLoggedInAgentId(null);
      setIsLogged(false);

      localStorage.clear();
      delete cacheStore[CacheKeys.ACCESS_TOKEN];
      navigate('/login');

      localStorage.clear();
    },
    loggedInAgent,
    loggedInAgentId: loggedInAgentId || AGENT_ID,
    isLogged,
    isLoading: loading,
    refetch: async () => {
      const { data: getAgentData } = await refetch({
        id: loggedInAgentId as string,
        applicationId: env.APPLICATION_ID as string
      });
      updateAgent(getAgentData);
    }
  };
}
