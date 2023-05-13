import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  isLoggedIn,
  clearStorageData,
} from '../utility/auth.utility';
import { InternalAxiosRequestConfig } from 'axios';

interface RequestConfig extends InternalAxiosRequestConfig {
  [key: string]: any;
}

const baseUrl = process.env.REACT_APP_AUCTION_SERVICE_BASE_URL;
const RequestInterceptor = axios.create({
  baseURL: baseUrl,
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${getAccessToken()}`,
  },
  responseType: 'json',
});

RequestInterceptor.interceptors.request.use(
  (config: RequestConfig) => {
    if (isLoggedIn()) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  },
);
RequestInterceptor.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    if (error.response !== undefined) {
      if (
        (error.response.status === 401 || error.response.status === 422) &&
        isLoggedIn()
      ) {
        const bearerRefreshAuthorizationHeader = {
          headers: {
            Authorization: `Bearer ${getRefreshToken()}`,
          },
        };
        await axios
          .post(`${baseUrl}/auth/refresh`, {}, bearerRefreshAuthorizationHeader)
          .then((tokenRefreshResponse: any) => {
            setAccessToken(tokenRefreshResponse.data.result.accessToken);
            setRefreshToken(tokenRefreshResponse.data.result.refreshToken);
            window.location.reload();
          })
          .catch((error: any) => {
            if (
              error.response.request.responseURL === `${baseUrl}/auth/refresh`
            ) {
              clearStorageData();
              window.location.reload();
            }
          });
      }
      return error.response;
    }
  },
);

export default RequestInterceptor;
