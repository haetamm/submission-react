import { ActionType } from './action';

const initialState = {
  loading: false,
  leaderboards: [],
};

const leaderboardReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case ActionType.SET_LOADING:
    return {
      ...state,
      loading: action.payload.loading,
    };
  case ActionType.RECEIVE_LEADERBOARD:
    return {
      ...state,
      leaderboards: action.payload.leaderboards,
    };
  case ActionType.CLEAR_LEADERBOARD:
    return {
      ...state,
      leaderboards: [],
    };
  default:
    return state;
  }
};

export default leaderboardReducer;
