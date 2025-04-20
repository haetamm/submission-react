import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <div className="toggle">
      <div onClick={toggleTheme} className="cursor-pointer">
        {theme === 'dark' ? (
          <FaSun className="icon" data-testid="sun-icon" />
        ) : (
          <FaMoon className="icon" data-testid="moon-icon" />
        )}
      </div>
    </div>
  );
};

export default ToggleTheme;