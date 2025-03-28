import React, { useState } from 'react';
import '../styles/sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import ButtonCreate from './ButtonCreate';
import { navItems } from '../utils/link';
import { isActive } from '../utils/helper';
import { translatedNames } from '../utils/lang';
import useLanguage from '../hooks/useLanguage';
import usePermission from '../hooks/usePermission';
import AvatarUser from './AvatarUser';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { openModal } from '../stores/modal/action';

const SideBar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const language = useLanguage();
  const { isAuthenticated, authUser } = usePermission();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="wrap-logo">
        <div className="logo">XCLONE</div>
      </div>
      <div className="wrap-sidebar">
        <div className="sidebar">
          {navItems.slice(0, 3).map(({ name, route, icon: Icon }) => (
            <Link key={name} to={route} className="sidebar-link">
              <Icon
                className={`icon ${
                  isActive(pathname, route) ? 'active' : ''
                }`}
              />
              <h3 className={`${isActive(pathname, route) ? 'active' : ''}`}>
                {translatedNames[language][name]}
              </h3>
            </Link>
          ))}
          <ButtonCreate />

          {isAuthenticated && (
            <div className="wrap-logout" >
              <div className="wrap-avatar" onClick={toggleDropdown}>
                <div className="avatar-username">
                  <AvatarUser img={authUser.avatar} />
                  <div className="username">{authUser.name}</div>
                </div>
                <BiDotsHorizontalRounded className="icon" />
              </div>
              {isDropdownOpen && (
                <div className="logout-dropdown">
                  <div
                    className="logout-link"
                    onClick={() => dispatch(openModal('logout'), toggleDropdown())}
                  >
                    <span>Log out @{authUser.name}</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;