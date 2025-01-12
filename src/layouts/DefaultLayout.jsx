import React from "react";
import SearchNote from "../components/SearchNote";
import ButtonCreate from "../components/ButtonCreate";
import Modal from "../components/Modal";
import SideBar from "../components/SideBar";
import MobileNav from "../components/MobileNav";
import { Outlet } from "react-router-dom";
import HeaderNote from "../components/HeaderNote";

const DefaultLayout = () => {
  return (
    <>
      <main className="container">
        <aside>
          <div className="wrap-logo">
            <img src="/logo.jpg" alt="logo" className="logo" />
          </div>
          <SideBar />
        </aside>

        <section className="wrap-section">
          <SearchNote />

          <section className="section-list-note">
            <HeaderNote />
            <Outlet />
          </section>
        </section>
      </main>
      <ButtonCreate />
      <MobileNav />
      <Modal />
    </>
  );
};

export default DefaultLayout;
