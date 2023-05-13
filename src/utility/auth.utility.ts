export const setAccessToken = (accessToken: string): any => {
  return localStorage.setItem('accessToken', accessToken);
};
export const setRefreshToken = (refreshToken: string): any => {
  return localStorage.setItem('refreshToken', refreshToken);
};
export const getAccessToken = (): any => {
  return localStorage.getItem('accessToken');
};
export const getRefreshToken = (): any => {
  return localStorage.getItem('refreshToken');
};
export const clearStorageData = (): any => {
  localStorage.clear();
  sessionStorage.clear();
};
export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('accessToken');
};
