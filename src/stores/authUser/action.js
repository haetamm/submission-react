import { toast } from 'react-toastify';
import api from '../../utils/api';
import { urlPage } from '../../utils/constans';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
  SET_LOADING: 'SET_LOADING',
};

const setLoading = (loading) => {
  return {
    type: ActionType.SET_LOADING,
    payload: { loading  },
  };
};

const setAuthUserActionCreator = (authUser) => {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
};

const unsetAuthUserActionCreator = () => {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
};

const asyncSetAuthUser = ({ email, password }, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const token = await api.login({ email, password });
      api.putAccessToken(token);
      const authUser = await api.getOwnProfile();

      dispatch(setAuthUserActionCreator(authUser));
      navigate(urlPage.HOME);
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

const asyncUnsetAuthUser = () => {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    api.removeAccessToken();
  };
};

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
