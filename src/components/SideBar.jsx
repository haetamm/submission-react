import React, { useContext } from "react";
import "../styles/sidebar.css";
import { navItems } from "../utils/fields";
import { Link, useLocation } from "react-router-dom";
import { isActive } from "../utils";
import ButtonCreate from "./ButtonCreate";
import { AppContext } from "../contexts/AppContext";
import { translatedNames } from "../utils/lang";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";

const SideBar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { language } = useContext(AppContext);
  const { name } = useSelector((state) => state.user);

  return (
    <>
      <aside>
        <div className="wrap-logo">
          <div className="logo">TWEETNOTE</div>
        </div>
        <div className="wrap-sidebar">
          <div className="sidebar">
            {navItems.slice(0, 3).map(({ name, route, icon: Icon }) => (
              <Link key={name} to={route}>
                <Icon
                  className={`icon  ${
                    isActive(pathname, route) ? "active" : ""
                  }`}
                />
                <h3 className={`${isActive(pathname, route) ? "active" : ""}`}>
                  {translatedNames[language][name]}
                </h3>
              </Link>
            ))}
            <ButtonCreate />

            <div
              onClick={() => {
                dispatch({
                  type: "OPEN_MODAL",
                  payload: {
                    type: "logout",
                  },
                });
              }}
              className="wrap-logout"
            >
              <div className="wrap-avatar">
                <IoMdLogOut className="icon" />
                <h3>{name}</h3>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
