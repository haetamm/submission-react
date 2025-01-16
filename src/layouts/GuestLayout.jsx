import React from "react";
import "../styles/guest-layout.css";
import { AppProvider } from "../contexts/AppProvider";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";

const GuestLayout = () => {
  const { token } = useSelector((state) => state.user);

  if (token) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <AppProvider>
        <div className="login-wrapper">
          <div className="login-container">
            <Outlet />
          </div>
        </div>
      </AppProvider>
      <Toaster className="text-lg" position="top-center" />
    </>
  );
};

export default GuestLayout;
