import RequestInterceptor from './RequestInterceptor';

export const publishItem = async (itemId: string) => {
  try {
    const response = await RequestInterceptor.post(`/items/publish/${itemId}`);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};

export const createItem = async (item: any) => {
  try {
    const response = await RequestInterceptor.post('/items', item);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};

export const searchItem = async (status: string) => {
  try {
    const response = await RequestInterceptor.get(
      `/items/search?status=${status}`,
    );
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};

export const bidItem = async (payload: any) => {
  try {
    const response = await RequestInterceptor.post(`/bid/${payload.id}`, {
      bid: payload.bid,
    });
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};

export const deleteItem = async (itemId: string) => {
  try {
    const response = await RequestInterceptor.delete(`/items/${itemId}`);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};
