import api from '../../utils/api';
import { toast } from 'react-toastify';

const ActionType = {
  RECEIVE_COMMENTS: 'RECEIVE_COMMENTS',
  ADD_COMMENT: 'ADD_COMMENT',
  UPDATE_COMMENT_VOTE: 'UPDATE_COMMENT_VOTE'
};

const receiveCommentsActionCreator = (comments) => {
  return {
    type: ActionType.RECEIVE_COMMENTS,
    payload: {
      comments,
    },
  };
};

const addCommentActionCreator = (comment) => {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
};

const updateCommentVoteActionCreator = ({ commentId, userId, voteType }) => {
  return {
    type: ActionType.UPDATE_COMMENT_VOTE,
    payload: {
      commentId,
      userId,
      voteType,
    },
  };
};

const asyncAddComment = ({ data, id, setLoading, reset }) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const { content } = data;
      const comment = await api.createComment({ content }, id);
      dispatch(addCommentActionCreator(comment));
      toast.success('balasan berhasil dikirim');
      reset({ content: '' });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
};

const asyncUpVoteComment = (threadId, commentId, userId) => {
  return async (dispatch, getState) => {
    const currentComments = [...getState().comments];

    const optimisticUpdate = { commentId, userId, voteType: 1 };
    dispatch(updateCommentVoteActionCreator(optimisticUpdate));

    try {
      const result = await api.upVoteComment(threadId, commentId);
      dispatch(updateCommentVoteActionCreator(result));
    } catch (error) {
      dispatch(receiveCommentsActionCreator(currentComments));
      toast.error(error.message);
    }
  };
};

const asyncDownVoteComment = (threadId, commentId, userId) => {
  return async (dispatch, getState) => {
    const currentComments = [...getState().comments];

    const optimisticUpdate = { commentId, userId, voteType: -1 };
    dispatch(updateCommentVoteActionCreator(optimisticUpdate));

    try {
      const result = await api.downVoteComment(threadId, commentId);
      dispatch(updateCommentVoteActionCreator(result));
    } catch (error) {
      dispatch(receiveCommentsActionCreator(currentComments));
      toast.error(error.message);
    }
  };
};

const asyncNeutralVoteComment = (threadId, commentId, userId) => {
  return async (dispatch, getState) => {
    const currentComments = [...getState().comments];

    const optimisticUpdate = { commentId, userId, voteType: 0 };
    dispatch(updateCommentVoteActionCreator(optimisticUpdate));

    try {
      const result = await api.neutralVoteComment(threadId, commentId);
      dispatch(updateCommentVoteActionCreator(result));
    } catch (error) {
      dispatch(receiveCommentsActionCreator(currentComments));
      toast.error(error.message);
    }
  };
};

export {
  ActionType,
  receiveCommentsActionCreator,
  addCommentActionCreator,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  updateCommentVoteActionCreator
};
