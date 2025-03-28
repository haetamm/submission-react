import React, { useEffect } from 'react';
import '../styles/leaderboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboard } from '../stores/leaderboard/action';
import { translatedNames } from '../utils/lang';
import useLanguage from '../hooks/useLanguage';

const LeaderBoardPage = () => {
  const language = useLanguage();
  const dispatch = useDispatch();
  const { loading, leaderboard } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, [dispatch]);

  return (
    <>
      <title>Leadeerboard / XClone</title>
      <meta name="description" content="Leaderboard Page" />
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div className="crown-left"></div>
          <h1>{translatedNames[language]['Leaderboard']}</h1>
          <div className="crown-right"></div>
        </div>
        <div className="leaderboard-list">
          {loading ? (
            <div className="wrap-loading">
              <div className="loading" />
            </div>
          ) : leaderboard && leaderboard.length > 0 ? (
            leaderboard.map(({ score, user }, index) => (
              <div
                key={index}
                className={`leaderboard-row ${index === 0 ? 'first-place' : ''}`}
              >
                <div className="rank">
                  <span className="rank-circle">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="player-info">
                  <img src={user.avatar} alt={user.name} className="player-icon" />
                  <span className="player-name">{user.name}</span>
                </div>
                <div className="score">{score}</div>
              </div>
            ))
          ) : (
            <div className="not-found">{translatedNames[language]['Tidak Ditemukan']}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaderBoardPage;