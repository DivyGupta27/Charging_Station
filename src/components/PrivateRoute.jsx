import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    toast.error('Please login first');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
