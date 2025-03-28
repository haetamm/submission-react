import NProgress from 'nprogress';
import api from '../../utils/api';
import { toast } from 'react-toastify';

const ActionType = {
  SET_LOADING: 'SET_LOADING',
  RECEIVE_LEADERBOARD: 'RECEIVE_LEADERBOARD',
  CLEAR_LEADERBOARD: 'CLEAR_LEADERBOARD',
};

const setLoading = (loading) => {
  return {
    type: ActionType.SET_LOADING,
    payload: { loading },
  };
};

const receiveLeaderboardActionCreator = (leaderboard) => {
  return {
    type: ActionType.RECEIVE_LEADERBOARD,
    payload: {
      leaderboard,
    },
  };
};

const clearLeaderboardActionCreator = () => {
  return {
    type: ActionType.CLEAR_LEADERBOARD,
  };
};

const asyncReceiveLeaderboard = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    NProgress.start();
    try {
      dispatch(clearLeaderboardActionCreator());
      const leaderboard = await api.getLeaderboards();

      dispatch(receiveLeaderboardActionCreator(leaderboard));
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
  setLoading,
  receiveLeaderboardActionCreator,
  asyncReceiveLeaderboard,
  clearLeaderboardActionCreator
};