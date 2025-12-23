import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { admin } = useSelector((state) => state.adminInfo);
  const isAuth = !!admin?._id;

  return isAuth ? (
    children
  ) : (
    <Navigate state={{ from: { pathname: location.pathname } }} to="/" replace />
  );
};

export default AuthRoute;
