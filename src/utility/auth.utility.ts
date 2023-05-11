export const getAccessToken = (): any => {
  return (
    sessionStorage.getItem('access_token') ||
    'eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODM4MDMzOTgsIm5iZiI6MTY4MzgwMzM5OCwiZXhwIjoxNjgzODA2OTk4LCJ0eXBlIjoiYWNjZXNzIiwiaWRlbnRpdHkiOiI3ZWM5ZTk5MzhjZGFhYzlkZTYxODU2MzUwMzA0YWNjYjIzYjA0ODVlIiwianRpIjoiMzNiYzYzNWYtZTI5OS00ZjA0LTliYmYtODBkMjQ5OTlhYWM0In0.AGIrvhfcZio5gBhPdDXGN2NOH_ciS6N2nqiu1w4tOFiGJe7VEfudFavAiMZ1aJHPgfr-XVbUvhX8bljife5wAwNGAb01WmzWyonG8BT8a3Iw0AbzmprXZ1900E0F87jCJvvxBi5s2rvq4IYtcfrEPm2QWpcHqzuwMBKoYSkWV0VW_-NN'
  );
};

export const getRefreshToken = (): any => {
  return sessionStorage.getItem('refresh_token');
};

export const isLoggedIn = (): boolean => {
  return !!sessionStorage.getItem('access_token');
};
