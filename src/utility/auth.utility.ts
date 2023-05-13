export const setAccessToken = (accessToken: string): any => {
  return localStorage.setItem('accessToken', accessToken);
};
export const setRefreshToken = (refreshToken: string): any => {
  return localStorage.setItem('refreshToken', refreshToken);
};
export const setUserId = (userId: string): any => {
  return localStorage.setItem('userId', userId);
};
export const getAccessToken = (): any => {
  return localStorage.getItem('accessToken');
};
export const getRefreshToken = (): any => {
  return localStorage.getItem('refreshToken');
};
export const getUserId = (): any => {
  return localStorage.getItem('userId');
};
export const clearStorageData = (): any => {
  localStorage.clear();
  sessionStorage.clear();
};
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('accessToken');
};
