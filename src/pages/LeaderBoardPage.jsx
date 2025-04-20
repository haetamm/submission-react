import React, { useEffect } from 'react';
import '../styles/leaderboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboard } from '../stores/leaderboard/action';
import LeaderboardItem from '../components/LeaderboardItem';

const LeaderBoardPage = () => {
  const dispatch = useDispatch();
  const { loading, leaderboards } = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, [dispatch]);

  return (
    <>
      <title>Leaderboard / XClone</title>
      <meta name="description" content="Leaderboard Page" />
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <div className="crown-left"></div>
          <h1>Leaderboard</h1>
          <div className="crown-right"></div>
        </div>
        <div className="leaderboard-list">
          {loading ? (
            <div className="wrap-loading">
              <div className="loading" />
            </div>
          ) : leaderboards && leaderboards.length > 0 ? (
            leaderboards.map(({ score, user }, index) => (
              <LeaderboardItem
                key={user.id}
                rank={index + 1}
                user={user}
                score={score}
                isFirstPlace={index === 0}
                gradientType={index === 0 ? 'first' : 'default'}
              />
            ))
          ) : (
            <div className="not-found">Not Found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default LeaderBoardPage;