import NProgress from 'nprogress';
import api from '../../utils/api';
import { receiveUsersActionCreator } from '../user/action';
import { receiveThreadsActionCreator } from '../thread/action';
import { toast } from 'react-toastify';

const ActionType = {
  SET_LOADING: 'SET_LOADING',
};

const setLoading = (loading) => {
  return {
    type: ActionType.SET_LOADING,
    payload: { loading },
  };
};

const asyncPopulateUsersAndThreads = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    NProgress.start();
    try {
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
      NProgress.done();
    }
  };
};

export {
  asyncPopulateUsersAndThreads,
  ActionType,
  setLoading,
};

