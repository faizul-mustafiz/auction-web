import axios from 'axios';
import { getAccessToken, getRefreshToken } from '../utility/auth.utility';
import RequestInterceptor from './RequestInterceptor';

export const getUserInfo = async (userId: string) => {
  try {
    const response = await RequestInterceptor.get(`/users/${userId}`);
    console.log('response', response);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};
