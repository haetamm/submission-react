import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import '../styles/guest-layout.css';
import { ToastContainer } from 'react-toastify';
import usePermission from '../hooks/usePermission';
import { urlPage } from '../utils/constans';
import Loader from '../components/Loader';
import usePreload from '../hooks/usePreload';

const GuestLayout = () => {
  const { isAuthenticated } = usePermission();
  const { loading } = usePreload();

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to={urlPage.HOME} />;
  }

  return (
    <>
      <ToastContainer />
      <div className="login-wrapper">
        <div className="login-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default GuestLayout;
