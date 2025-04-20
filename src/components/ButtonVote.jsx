import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';

const ButtonVote = ({
  votes = [],
  type = 'like',
  upVote,
  downVote,
  neutralVote,
}) => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.authUser) || {};
  const isVoted = authUser && votes.includes(authUser.id);

  const handleClick = () => {
    if (!authUser) return;
    if (isVoted) {
      dispatch(neutralVote);
    } else {
      dispatch(type === 'like' ? upVote : downVote);
    }
  };

  const Icon = type === 'like' ? AiFillLike : AiFillDislike;

  return (
    <div className="wrap-icon" >
      <Icon
        data-testid={type}
        onClick={handleClick}
        className={`${isVoted ? 'active' : ''} icon cursor-pointer`}
      />
      <p>{votes.length}</p>
    </div>
  );
};

ButtonVote.propTypes = {
  votes: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['like', 'dislike']).isRequired,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func.isRequired,
};

export default ButtonVote;
