import { updateVotes } from '../../utils/helper';
import { ActionType } from './action';

const commentReducer = (comments = [], action = {}) => {
  switch (action.type) {
  case ActionType.RECEIVE_COMMENTS:
    return action.payload.comments;
  case ActionType.ADD_COMMENT:
    return [action.payload.comment, ...comments];
  case ActionType.UPDATE_COMMENT_VOTE: {
    const { commentId, userId, voteType } = action.payload;
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return updateVotes(comment, userId, voteType);
      }
      return comment;
    });
  }
  default:
    return comments;
  }
};

export default commentReducer;

