import * as storage from '../helpers/storage';

interface IAuthHeaders {
  accessToken: string;
  refreshToken: string;
}

interface IAuthHeadersResult {
  accessToken: string;
}

export const setAuthHeaders = (headers: IAuthHeaders) => {
  storage.setItem('accessToken', headers.accessToken);
  storage.setItem('refreshToken', headers.refreshToken);
};

export const removeAuthHeaders = () => {
  storage.removeItem('accessToken');
};

export const getAuthHeaders = (): IAuthHeadersResult => {
  return {
    accessToken: storage.getItem('accessToken') as string
  };
};
