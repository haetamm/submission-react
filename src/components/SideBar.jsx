import React from "react";
import "../styles/sidebar.css";
import "../styles/mobile-nav.css";
import { navItems } from "../utils/fields";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isActive } from "../utils";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  return (
    <>
      <div className="wrap-sidebar">
        <div className="sidebar">
          {navItems.map(({ name, route, icon: Icon }) => (
            <Link key={name} to={route}>
              <Icon
                className={`icon  ${isActive(pathname, route) ? "active" : ""}`}
              />
              <h3 className={`${isActive(pathname, route) ? "active" : ""}`}>
                {name}
              </h3>
            </Link>
          ))}
          <button
            onClick={() => {
              dispatch({
                type: "OPEN_MODAL",
                payload: {
                  type: "add",
                },
              });
            }}
            className="post-btn cursor-pointer"
          >
            <div className="add">Tambah</div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
