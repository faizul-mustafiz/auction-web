import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utility/auth.utility';

export default function PrivateRoute({ children }: any) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}
