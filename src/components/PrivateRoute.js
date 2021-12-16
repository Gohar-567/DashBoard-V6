import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({ children }) => {
  //const userAuth = JSON.parse(sessionStorage.getItem('userAuth')) || null;
  const userAuth = true;
  return userAuth ? children : <Navigate to="/login" />;
};

export const PrivateOutlet = () => {
  const userAuth = true; //JSON.parse(sessionStorage.getItem('userAuth')) || null;
  return userAuth ? <Outlet /> : <Navigate to="/login" />;
};
