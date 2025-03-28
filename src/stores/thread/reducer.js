import { updateVotes } from '../../utils/helper';
import { ActionType } from './action';

const initialState = {
  threads: [],
};

const threadReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return {
      ...state,
      threads: action.payload.threads,
    };
  case ActionType.ADD_THREAD:
    return {
      ...state,
      threads: [action.payload.thread, ...state.threads],
    };
  case ActionType.UPDATE_THREAD_VOTE: {
    const { threadId, userId, voteType } = action.payload;
    return {
      ...state,
      threads: state.threads.map((thread) =>
        thread.id === threadId ? updateVotes(thread, userId, voteType) : thread
      ),
    };
  }
  default:
    return state;
  }
};

export default threadReducer;
