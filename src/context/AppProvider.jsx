import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from './AppContext';

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'ligth');
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'id'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'ligth' ? 'dark' : 'ligth';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme]);

  const toggleLanguage = useCallback(() => {
    const newLanguage = language === 'id' ? 'en' : 'id';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  }, [language]);

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      language,
      toggleLanguage,
    }),
    [theme, language, toggleLanguage, toggleTheme]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
