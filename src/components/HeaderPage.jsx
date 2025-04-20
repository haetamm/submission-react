import React, {  } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useMatches, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ToggleTheme from './ToggleTheme';

const HeaderPage = ({ changeStyle }) => {
  const navigate = useNavigate();
  const matches = useMatches();

  const namePage = matches.find((match) => match.handle?.name)?.handle?.name;
  const show = (namePage === 'Search' || namePage === 'Detail Thread');

  const back = () => {
    navigate(-1);
  };

  return (
    <header className={`${changeStyle ? 'w-header-thread' : 'w-header-thread_leaderboard'} header-thread`}>
      <div className="title-page">
        {show && (
          <FaArrowLeft onClick={back} className="icon cursor-pointer" />
        )}
        <h3>{namePage}</h3>
      </div>
      <ToggleTheme />
    </header>
  );
};

HeaderPage.propTypes = {
  changeStyle: PropTypes.bool.isRequired,
};

export default HeaderPage;
