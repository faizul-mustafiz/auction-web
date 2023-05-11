export const setAccessToken = (accessToken: string): any => {
  return localStorage.setItem('accessToken', accessToken);
};
export const setRefreshToken = (refreshToken: string): any => {
  return localStorage.setItem('refreshToken', refreshToken);
};
export const getAccessToken = (): any => {
  return (
    localStorage.getItem('access_token') ||
    'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODM4MjgxNTEsIm5iZiI6MTY4MzgyODE1MSwiZXhwIjoxNjgzOTE0NTUxLCJ0eXBlIjoiYWNjZXNzIiwiaWRlbnRpdHkiOiIyZmI2MDlhODQ2NWJhOTIwMjBlNjgwYmNiNTBiMDUzZWJjOWM2ZmJkIiwianRpIjoiODNjNjg1MmQtODQ4OC00ODIwLTgwYWMtZTkzMWYxODE2OTZhIn0.Ad-V1i6zqRvlN-b0cGBdxqru8wmbwWAaMoRkFbCcKZbSxzTYz-Q1bE9a6KExXVwVmM-gfT7WLpHKW86O8NFoNEe9ALpKKZkIY6aosfrDfp4FxmT3oH4xVzqnKdIfXxypEcHKQ6TfhmeZdiHSrTg0y1q-HHPdibu3ssKgX8973ylQCvY_'
  );
};
export const getRefreshToken = (): any => {
  return (
    localStorage.getItem('refresh_token') ||
    'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODM4MjgxNTEsIm5iZiI6MTY4MzgyODE1MSwiZXhwIjoxNjg0MDAwOTUxLCJ0eXBlIjoicmVmcmVzaCIsImlkZW50aXR5IjoiYTFlZWIyMjU3ZTkzZGM5YjUzYzIyNjEyYThlYmYzNThmZGI1NWE3ZiIsImp0aSI6IjQzZThmNjZhLWFjYzUtNDAwMC1iOWRlLTEzZGZmMTA2YTI0MSJ9.AJFz8Mvzk8gCigghsoIhsq7Pb53LnXotdtKO_wBb2S-C7nh5W1VHwmhmjHwlp8uRaZFN0gpSH_4HUviR0e7wAj7rARwnftB0hU42rxZRtIzRW5qOCfPfeJ_4HFGYRklNtHoH-U0G7EoNyUzd4flvGIF16kKv1CZyB9BLGIdnURgCp9RZ'
  );
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem('access_token');
};
