// src/routing/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if token exists in local storage
  const isAuthenticated = localStorage.getItem('token'); 
  
  // If authenticated, render the children (the requested page component)
  // Otherwise, redirect to the login page.
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;