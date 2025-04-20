import { ActionType } from './action';

const sharedReducer = (loading = false, action = {}) => {
  switch (action.type) {
  case ActionType.SET_LOADING:
    return {
      loading: action.payload.loading,
    };
  default:
    return loading;
  }
};

export default sharedReducer;
