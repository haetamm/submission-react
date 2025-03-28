import { ActionType } from './action';

const initialState = {
  loading: false,
  leaderboard: null,
};

const leaderboardReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionType.SET_LOADING:
    return {
      ...state,
      loading: action.payload.loading,
    };
  case ActionType.RECEIVE_LEADERBOARD:
    return {
      ...state,
      leaderboard: action.payload.leaderboard,
    };
  case ActionType.CLEAR_LEADERBOARD:
    return {
      ...state,
      leaderboard: null,
    };
  default:
    return state;
  }
};

export default leaderboardReducer;
