import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

const setIsPreloadActionCreator = (isPreload) => {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
};

const asyncPreloadProcess = (setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const token = api.getAccessToken();
      if (!token) {
        dispatch(setAuthUserActionCreator(null));
        return;
      }

      const authUser = await api.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
    } catch (error) {
      console.error('Preload error:', error.message);
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      setLoading(false);
    }
  };
};


export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
