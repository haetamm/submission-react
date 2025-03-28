import { ActionType } from './action';

const initialState = {
  authUser: null,
  loading: false,
};

const authUserReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case ActionType.SET_AUTH_USER:
    return {
      ...state,
      authUser: action.payload.authUser,
    };
  case ActionType.UNSET_AUTH_USER:
    return {
      ...state,
      authUser: null,
    };
  case ActionType.SET_LOADING:
    return {
      ...state,
      loading: action.payload.loading,
    };
  default:
    return state;
  }
};

export default authUserReducer;
