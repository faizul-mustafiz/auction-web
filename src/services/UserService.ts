import RequestInterceptor from './RequestInterceptor';

export const getUserInfo = async (userId: string) => {
  try {
    const response = await RequestInterceptor.get(`/users/${userId}`);
    console.log('getUserInfo-response', response);
    return response?.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deposit = async (payload: any) => {
  try {
    const response = await RequestInterceptor.post('/users/deposit', payload);
    console.log('deposit-response', response);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};
