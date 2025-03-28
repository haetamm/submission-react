import React from 'react';
import { AiFillLike } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const ButtonLike = ({ likes = [], upVote, neutralVote }) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.authUser) || {};
  const isLiked = authUser && likes.includes(authUser.id);

  const handleClick = () => {
    if (!authUser) return;
    if (isLiked) {
      dispatch(neutralVote);
    } else {
      dispatch(upVote);
    }
  };

  return (
    <div className="wrap-icon">
      <AiFillLike
        onClick={handleClick}
        className={`${isLiked ? 'active' : ''} icon cursor-pointer`}
      />
      <p>{likes.length}</p>
    </div>
  );
};

ButtonLike.propTypes = {
  likes: PropTypes.array.isRequired,
  upVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired
};

export default ButtonLike;
