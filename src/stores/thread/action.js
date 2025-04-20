import { toast } from 'react-toastify';
import api from '../../utils/api';
import { closeModal } from '../modal/action';
import { receiveThreadDetailActionCreator, updateThreadDetailVoteActionCreator } from '../threadDetail/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UPDATE_THREAD_VOTE: 'UPDATE_THREAD_VOTE',
};


const receiveThreadsActionCreator = (threads) => {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
};

const addThreadActionCreator = (thread) => {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
};

const updateThreadVoteActionCreator = ({ threadId, userId, voteType }) => {
  return {
    type: ActionType.UPDATE_THREAD_VOTE,
    payload: {
      threadId,
      userId,
      voteType,
    },
  };
};


const asyncAddThread = ({ title, body, category }, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      dispatch(closeModal());
      toast.success('Thread berhasil dikirim');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
};

const asyncUpVoteThread = (threadId, userId) => {
  return async (dispatch, getState) => {
    const threadsState = getState().threads;
    const threadDetailState = getState().threadDetail;
    const previousThreads = threadsState.threads;
    const previousThreadDetail = threadDetailState.threadDetail
      ? { ...threadDetailState.threadDetail }
      : null;

    dispatch(updateThreadVoteActionCreator({ threadId, userId, voteType: 1 }));
    if (threadDetailState.threadDetail && threadDetailState.threadDetail.id === threadId) {
      dispatch(updateThreadDetailVoteActionCreator({ threadId, userId, voteType: 1 }));
    }

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      // Rollback kedua state
      dispatch(receiveThreadsActionCreator(previousThreads));
      if (previousThreadDetail && previousThreadDetail.id === threadId) {
        dispatch(receiveThreadDetailActionCreator(previousThreadDetail));
      }
      toast.error(error.message);

    }
  };
};

const asyncDownVoteThread = (threadId, userId) => {
  return async (dispatch, getState) => {
    const threadsState = getState().threads;
    const threadDetailState = getState().threadDetail;
    const previousThreads = [...threadsState.threads];
    const previousThreadDetail = threadDetailState.threadDetail
      ? { ...threadDetailState.threadDetail }
      : null;

    dispatch(updateThreadVoteActionCreator({ threadId, userId, voteType: -1 }));
    if (threadDetailState.threadDetail && threadDetailState.threadDetail.id === threadId) {
      dispatch(updateThreadDetailVoteActionCreator({ threadId, userId, voteType: -1 }));
    }

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      dispatch(receiveThreadsActionCreator(previousThreads));
      if (previousThreadDetail && previousThreadDetail.id === threadId) {
        dispatch(receiveThreadDetailActionCreator(previousThreadDetail));
      }
      toast.error(error.message);
    }
  };
};

const asyncNeutralVoteThread = (threadId, userId) => {
  return async (dispatch, getState) => {
    const threadsState = getState().threads;
    const threadDetailState = getState().threadDetail;
    const previousThreads = [...threadsState.threads];
    const previousThreadDetail = threadDetailState.threadDetail
      ? { ...threadDetailState.threadDetail }
      : null;

    dispatch(updateThreadVoteActionCreator({ threadId, userId, voteType: 0 }));
    if (threadDetailState.threadDetail && threadDetailState.threadDetail.id === threadId) {
      dispatch(updateThreadDetailVoteActionCreator({ threadId, userId, voteType: 0 }));
    }

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      dispatch(receiveThreadsActionCreator(previousThreads));
      if (previousThreadDetail && previousThreadDetail.id === threadId) {
        dispatch(receiveThreadDetailActionCreator(previousThreadDetail));
      }
      toast.error(error.message);
    }
  };
};

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  updateThreadVoteActionCreator
};
