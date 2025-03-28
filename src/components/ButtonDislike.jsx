import React from 'react';
import { AiFillDislike } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const ButtonDislike = ({ dislikes = [], downVote, neutralVote }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.authUser) || {};
  const isDislike = authUser && dislikes.includes(authUser.id);

  const handleClick = () => {
    if (!authUser) return;
    if (isDislike) {
      dispatch(neutralVote);
    } else {
      dispatch(downVote);
    }
  };

  return (
    <div className="wrap-icon">
      <AiFillDislike
        onClick={handleClick}
        className={`${isDislike ? 'active' : ''} icon cursor-pointer`}
      />
      <p>{dislikes.length}</p>
    </div>
  );
};

ButtonDislike.propTypes = {
  dislikes: PropTypes.array.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired
};

export default ButtonDislike;
