import React, { useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useMatches, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ToggleThemeAndLang from './ToggleThemeAndLang';
import { AppContext } from '../context/AppContext';
import { translatedNames } from '../utils/lang';

const HeaderPage = ({ changeStyle }) => {
  const navigate = useNavigate();
  const matches = useMatches();
  const { language } = useContext(AppContext);

  const namePage = matches.find((match) => match.handle?.name)?.handle?.name;
  const show = (namePage === 'Pencarian' || namePage === 'Detail Thread');

  const translatedPageName =
    translatedNames[language][namePage] ||
    translatedNames[language]['Halaman Tidak Ditemukan'];

  const back = () => {
    navigate(-1);
  };

  return (
    <header className={`${changeStyle ? 'w-header-thread' : 'w-header-thread_leaderboard'} header-thread`}>
      <div className="title-page">
        {show && (
          <FaArrowLeft onClick={back} className="icon cursor-pointer" />
        )}
        <h3>{translatedPageName}</h3>
      </div>
      <ToggleThemeAndLang />
    </header>
  );
};

HeaderPage.propTypes = {
  changeStyle: PropTypes.bool.isRequired,
};

export default HeaderPage;
