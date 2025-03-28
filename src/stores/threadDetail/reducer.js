import { updateVotes } from '../../utils/helper';
import { ActionType } from './action';

const initialState = {
  loading: false,
  threadDetail: null,
};

const threadDetailReducer = (state = initialState, action) => {
  switch (action.type) {
  case ActionType.SET_LOADING:
    return {
      ...state,
      loading: action.payload.loading,
    };
  case ActionType.RECEIVE_THREAD_DETAIL:
    return {
      ...state,
      threadDetail: action.payload.threadDetail,
    };
  case ActionType.UPDATE_THREAD_DETAIL_VOTE: {
    const { threadId, userId, voteType } = action.payload;
    if (state.threadDetail && state.threadDetail.id === threadId) {
      return {
        ...state,
        threadDetail: updateVotes(state.threadDetail, userId, voteType),
      };
    }
    return state;
  }
  case ActionType.CLEAR_THREAD_DETAIL:
    return {
      ...state,
      threadDetail: null,
    };
  default:
    return state;
  }
};

export default threadDetailReducer;
