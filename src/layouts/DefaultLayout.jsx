import React, { useCallback, useEffect, useState } from "react";
import SearchNote from "../components/SearchNote";
import ButtonCreate from "../components/ButtonCreate";
import Modal from "../components/Modal";
import MobileNav from "../components/MobileNav";
import { Navigate, Outlet } from "react-router-dom";
import HeaderNote from "../components/HeaderNote";
import { AppProvider } from "../contexts/AppProvider";
import { useDispatch, useSelector } from "react-redux";
import { getUserLogged } from "../utils/api";
import Loader from "../components/Loader";
import SideBar from "../components/SideBar";
import { Toaster } from "sonner";

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await getUserLogged();
      if (data) {
        dispatch({
          type: "SET_USER",
          payload: {
            name: data.name,
            img_url: `https://ui-avatars.com/api/?name=${data.name}&background=random`,
          },
        });
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser, token]);

  if (loading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to={"/guest/login"} />;
  }

  return (
    <>
      <AppProvider>
        <main className="container">
          <SideBar />
          <section className="wrap-section">
            <SearchNote />

            <section className="section-list-note">
              <HeaderNote />
              <Outlet />
            </section>
          </section>
        </main>
        <div className="wrap-button-create">
          <ButtonCreate />
        </div>
        <MobileNav />
        <Modal />
      </AppProvider>
      <Toaster className="text-lg" position="top-right" />
    </>
  );
};

export default DefaultLayout;
