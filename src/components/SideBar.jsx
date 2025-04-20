import React, { useState } from 'react';
import '../styles/sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import ButtonCreate from './ButtonCreate';
import { navItems } from '../utils/link';
import { isActive } from '../utils/helper';
import usePermission from '../hooks/usePermission';
import AvatarUser from './AvatarUser';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { openModal } from '../stores/modal/action';
import { typeModal } from '../utils/constans';

const SideBar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
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
                {name}
              </h3>
            </Link>
          ))}
          <ButtonCreate />

          {isAuthenticated && (
            <div className="wrap-logout" >
              <div data-testid='logout-button' className="wrap-avatar" onClick={toggleDropdown}>
                <div className="avatar-username">
                  <AvatarUser img={authUser.avatar} />
                  <div className="username">{authUser.name}</div>
                </div>
                <BiDotsHorizontalRounded className="icon" />
              </div>
              {isDropdownOpen && (
                <div className="logout-dropdown">
                  <div
                    data-testid="logout-toggle"
                    className="logout-link"
                    onClick={() => dispatch(openModal(typeModal.LOGOUT), toggleDropdown())}
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