import { toast } from 'react-toastify';
import api from '../../utils/api';
import NProgress from 'nprogress';
import { receiveCommentsActionCreator } from '../comment/action';


const ActionType = {
  SET_LOADING: 'SET_LOADING',
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UPDATE_THREAD_DETAIL_VOTE: 'UPDATE_THREAD_DETAIL_VOTE'
};

const setLoading = (loading) => {
  return {
    type: ActionType.SET_LOADING,
    payload: { loading  },
  };
};

const receiveThreadDetailActionCreator = (threadDetail) => {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
};

const updateThreadDetailVoteActionCreator = ({ threadId, userId, voteType }) => {
  return {
    type: ActionType.UPDATE_THREAD_DETAIL_VOTE,
    payload: {
      threadId,
      userId,
      voteType,
    },
  };
};

const clearThreadDetailActionCreator = () => {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
};

const asyncReceiveThreadDetail = (threadId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    NProgress.start();
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
      dispatch(receiveCommentsActionCreator(threadDetail.comments));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
      NProgress.done();
    }
  };
};


export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  updateThreadDetailVoteActionCreator
};
