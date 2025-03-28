import { ActionType } from './action';

const initialState = {
  users: [],
  loading: false,
};

const usersReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case ActionType.RECEIVE_USERS:
    return {
      ...state,
      users: action.payload.users,
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

export default usersReducer;
