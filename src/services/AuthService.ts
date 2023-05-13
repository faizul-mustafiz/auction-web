import axios from 'axios';
import { getAccessToken, getRefreshToken } from '../utility/auth.utility';

interface AuthRequestBody {
  email: string;
  password: string;
}
interface VerifyPayload {
  token: string;
  code: string;
}

const baseUrl = process.env.REACT_APP_AUCTION_SERVICE_BASE_URL;

export const signIn = async (body: AuthRequestBody) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/sign-in`, body);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};
export const signUp = async (body: AuthRequestBody) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/sign-up`, body);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};
export const verify = async (payload: VerifyPayload) => {
  const verifyAuthorizationHeader = {
    headers: {
      Authorization: `Bearer ${payload.token}`,
    },
  };
  const verifyRequestBody = {
    code: payload.code,
  };
  try {
    const response = await axios.post(
      `${baseUrl}/auth/verify`,
      verifyRequestBody,
      verifyAuthorizationHeader,
    );
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};
export const signOut = async () => {
  const accessAuthorizationHeader = {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
  const refreshAuthorizationHeader = {
    headers: {
      Authorization: `Bearer ${getRefreshToken()}`,
    },
  };
  try {
    const atRevokeResponse = await axios.post(
      `${baseUrl}/auth/revoke-at`,
      {},
      accessAuthorizationHeader,
    );
    const rtRevokeResponse = await axios.post(
      `${baseUrl}/auth/revoke-rt`,
      {},
      refreshAuthorizationHeader,
    );
    return Promise.resolve({
      success: true,
      message: 'Sign out Successful',
      result: { ...atRevokeResponse, ...rtRevokeResponse },
    });
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};
