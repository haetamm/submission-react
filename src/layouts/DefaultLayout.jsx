import React, {  } from 'react';
import SearchThread from '../components/SearchThread';
import ButtonCreate from '../components/ButtonCreate';
import MobileNav from '../components/MobileNav';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderPage from '../components/HeaderPage';
import SideBar from '../components/SideBar';
import { ToastContainer } from 'react-toastify';
import { isActive } from '../utils/helper';
import { urlPage } from '../utils/constans';
import Loader from '../components/Loader';
import usePreload from '../hooks/usePreload';
import Modal from '../components/Modal';

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const changeStyle = !isActive(pathname, urlPage.LEADERBOARD);
  const { loading } = usePreload();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Modal />
      <main className="container">
        <section className='section-sidebar'>
          <SideBar />
        </section>
        <section className="wrap-section">
          {changeStyle && (
            <section className="section-search">
              <SearchThread />
            </section>
          )}

          <section className={`${changeStyle ? 'section-list-thread' : 'section-list-thread_leaderboard'}`}>
            <HeaderPage changeStyle={changeStyle} />
            <Outlet />
          </section>
        </section>
      </main>
      <div className="wrap-button-create">
        <ButtonCreate />
      </div>
      <MobileNav />
      <ToastContainer />
    </>
  );
};

export default DefaultLayout;
