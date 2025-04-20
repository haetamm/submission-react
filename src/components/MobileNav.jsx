import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/mobile-nav.css';
import { navItems } from '../utils/link';
import { isActive } from '../utils/helper';
import usePermission from '../hooks/usePermission';
import { typeModal, urlPage } from '../utils/constans';
import { useDispatch } from 'react-redux';
import { openModal } from '../stores/modal/action';

const MobileNav = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { isAuthenticated } = usePermission();

  const getRoute = (item) => {
    return item.name === 'Logout'
      ? (isAuthenticated ? item.route : urlPage.LOGIN)
      : item.route;
  };

  const handleLogoutClick = (item) => {
    if (item.name === 'Logout' && isAuthenticated) {
      dispatch(openModal(typeModal.LOGOUT));
    }
  };

  return (
    <div className="mobile-nav">
      {navItems.map((item) => (
        <div key={item.name} className="nav-item">
          <Link
            to={getRoute(item)}
            className="nav-link"
            onClick={() => handleLogoutClick(item)}
          >
            <item.icon
              className={`icon ${
                isActive(pathname, item.route) ? 'active' : ''
              }`}
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MobileNav;