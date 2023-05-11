import axios from 'axios';
import {
  getAccessToken,
  getRefreshToken,
  isLoggedIn,
} from '../utility/auth.utility';
import { InternalAxiosRequestConfig } from 'axios';

interface RequestObject extends InternalAxiosRequestConfig {
  [key: string]: any;
}

const baseUrl = process.env.REACT_APP_AUCTION_SERVICE_BASE_URL;
console.log('base-url', baseUrl);
const RequestInterceptor = axios.create({
  baseURL: baseUrl,
  headers: {
    'content-type': 'application/json',
    authorization: `Bearer ${getAccessToken()}`,
  },
  responseType: 'json',
});

RequestInterceptor.interceptors.request.use(
  (config: RequestObject) => {
    if (isLoggedIn()) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    console.log('request config in interceptor', config);
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
            sessionStorage.setItem(
              'accessToken',
              tokenRefreshResponse.data.result.accessToken,
            );
            sessionStorage.setItem(
              'refreshToken',
              tokenRefreshResponse.data.result.refreshToken,
            );
            window.location.reload();
          })
          .catch((error: any) => {
            if (
              error.response.request.responseURL === `${baseUrl}/auth/refresh`
            ) {
              sessionStorage.clear();
              window.location.reload();
            }
          });
      }
    }
  },
);

export default RequestInterceptor;
