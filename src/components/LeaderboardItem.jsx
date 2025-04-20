import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/leaderboard-item.module.css';

const LeaderboardItem = ({
  rank,
  user,
  score,
  isFirstPlace = false,
  gradientType = 'default',
  customGradient = '',
  rankCircleColor = '#2196f3',
  scoreColor = '#2196f3',
  userNameColor = '#14171a',
}) => {

  const backgroundStyle = customGradient ? { background: customGradient } : {};

  return (
    <div
      className={`${styles.leaderboardRow} ${
        !customGradient && gradientType === 'first' ? styles.firstPlace : styles[gradientType] || ''
      }`}
      style={backgroundStyle}
    >
      <div className={styles.rank}>
        <span
          className={styles.rankCircle}
          style={{
            background: isFirstPlace ? '#d4af37' : rankCircleColor,
          }}
        >
          {rank.toString().padStart(2, '0')}
        </span>
      </div>
      <div className={styles.playerInfo}>
        <img
          src={user.avatar}
          alt={user.name}
          className={styles.playerIcon}
        />
        <span
          className={styles.playerName}
          style={{ color: userNameColor }}
        >
          {user.name}
        </span>
      </div>
      <div
        className={styles.score}
        style={{ color: scoreColor }}
      >
        {score}
      </div>
    </div>
  );
};

LeaderboardItem.propTypes = {
  rank: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  isFirstPlace: PropTypes.bool,
  gradientType: PropTypes.oneOf(['default', 'first', 'blue', 'green']),
  customGradient: PropTypes.string,
  rankCircleColor: PropTypes.string,
  scoreColor: PropTypes.string,
  userNameColor: PropTypes.string,
};

LeaderboardItem.defaultProps = {
  isFirstPlace: false,
  gradientType: 'default',
  customGradient: '',
  rankCircleColor: '#2196f3',
  scoreColor: '#2196f3',
  userNameColor: '#14171a',
};

export default LeaderboardItem;