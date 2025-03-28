import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ToggleThemeAndLang = () => {
  const { theme, toggleTheme, language, toggleLanguage } =
    useContext(AppContext);

  return (
    <>
      <div className="toggle">
        <div onClick={toggleLanguage} className="cursor-pointer ">
          {language === 'en' ? 'ID' : 'EN'}
        </div>
        <div onClick={toggleTheme} className="cursor-pointer ">
          {theme === 'dark' ? (
            <FaSun className="icon" />
          ) : (
            <FaMoon className="icon" />
          )}
        </div>
      </div>
    </>
  );
};

export default ToggleThemeAndLang;
