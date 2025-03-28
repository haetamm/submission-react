import { toast } from 'react-toastify';
import api from '../../utils/api';
import { urlPage } from '../../utils/constans';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
  SET_LOADING: 'SET_LOADING',
};

const setLoading = (loading) => {
  return {
    type: ActionType.SET_LOADING,
    payload: { loading  },
  };
};

const receiveUsersActionCreator = (users) => {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
};

const asyncRegisterUser = ({ name, email, password }, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await api.register({ name, email, password });
      navigate(urlPage.LOGIN);
      toast.success(`selamat ${name}, silahkan login`)
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export { ActionType, setLoading, receiveUsersActionCreator, asyncRegisterUser };
