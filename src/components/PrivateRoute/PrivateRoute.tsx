import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }: any) {
  const isLoggedIn = true;
  console.log('isLoggedIn', isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
}
