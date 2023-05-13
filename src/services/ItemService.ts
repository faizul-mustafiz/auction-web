import RequestInterceptor from './RequestInterceptor';

export const publishItem = async (itemId: string) => {
  try {
    const response = await RequestInterceptor.post(`/items/publish/${itemId}`);
    console.log('publishItem-response', response);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};

export const createItem = async (item: any) => {
  try {
    const response = await RequestInterceptor.post('/items', item);
    console.log('createItem-response', response);
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
    console.log('searchItem-response', response);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};

export const bidItem = async (itemId: string, bidAmount: number) => {
  try {
    const response = await RequestInterceptor.post(`/bid/${itemId}`, {
      bid: bidAmount,
    });
    console.log('bidItem-response', response);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};

export const deleteItem = async (itemId: string) => {
  try {
    const response = await RequestInterceptor.delete(`/items/${itemId}`);
    console.log('deleteItem-response', response);
    return Promise.resolve(response?.data);
  } catch (error: any) {
    return Promise.resolve(error.response.data);
  }
};
