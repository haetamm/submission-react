import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useLanguage = () => {
  const { language } = useContext(AppContext);
  return language;
};

export default useLanguage;