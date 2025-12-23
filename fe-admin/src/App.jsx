// App.jsx
import './App.css';
import React, { useEffect, useState } from 'react';
import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { autoLogin } from './utils/admin';
import { ModalWrapper } from './components/modalWrapper/ModalWrapper';

const App = () => {
  const { admin } = useSelector((state) => state.adminInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!admin?._id) {
      autoLogin(dispatch); // pass dispatch to autoLogin
    }
  }, [admin?._id, dispatch]);

  return (
    <>
      <AppRoutes />
      <ToastContainer />
      <ModalWrapper/>
    </>
  );
};

export default App;
