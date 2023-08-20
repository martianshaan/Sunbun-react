/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts';

function ProtectedRoute({ children }) {
  const { token } = useAuthContext();
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
