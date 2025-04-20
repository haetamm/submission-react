/**
 * Test Scenarios
 *
 * - threadDetailReducer function
 *   - should return the initial state when no action is provided
 *   - should return the initial state when given an unknown action
 *   - should handle SET_LOADING action
 *   - should handle RECEIVE_THREAD_DETAIL action
 *   - should handle UPDATE_THREAD_DETAIL_VOTE for upvote, downvote, neutral vote, and non-matching threadId
 *   - should handle CLEAR_THREAD_DETAIL action
 */

import { ActionType } from './action';
import { describe, expect, it } from 'vitest';
import threadDetailReducer from './reducer';
import { updateVotes } from '../../utils/helper';

const sampleThreadDetail = {
  id: 'thread-1',
  title: 'Test Thread',
  body: 'This is a test thread',
  category: 'test',
  createdAt: '2023-01-01T00:00:00Z',
  owner: {
    id: 'user-1',
    name: 'Test User',
    avatar: 'https://ui-avatars.com/api/?name=TestUserbackground=random',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

const initialState = {
  loading: false,
  threadDetail: null,
};

describe('threadDetailReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // action
    const state = threadDetailReducer(undefined, {});
    // assert
    expect(state).toEqual(initialState);
  });

  it('should return the initial state when given an unknown action', () => {
    // action
    const nextState = threadDetailReducer(initialState, { type: 'UNKNOWN_ACTION' });
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle SET_LOADING action', () => {
    // arrange
    const action = {
      type: ActionType.SET_LOADING,
      payload: { loading: true },
    };
    // action
    const state = threadDetailReducer(initialState, action);
    // assert
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: { threadDetail: sampleThreadDetail },
    };
    // action
    const state = threadDetailReducer(initialState, action);
    // assert
    expect(state).toEqual({
      ...initialState,
      threadDetail: sampleThreadDetail,
    });
  });

  it('should handle UPDATE_THREAD_DETAIL_VOTE for upvote, downvote, neutral vote, and non-matching threadId', () => {
    // arrange
    const initialStateWithThread = {
      ...initialState,
      threadDetail: sampleThreadDetail,
    };
    const userId = 'user-2';
    const threadId = 'thread-1';

    //// Arrange (Test Upvote)
    const upvoteAction = {
      type: ActionType.UPDATE_THREAD_DETAIL_VOTE,
      payload: { threadId, userId, voteType: 1 },
    };
    // action
    const upvoteState = threadDetailReducer(initialStateWithThread, upvoteAction);
    const expectedUpvoteThread = updateVotes(sampleThreadDetail, userId, 1);
    // assert
    expect(upvoteState).toEqual({
      ...initialStateWithThread,
      threadDetail: expectedUpvoteThread,
    });


    //// Arrange (Test Downvote)
    const downvoteAction = {
      type: ActionType.UPDATE_THREAD_DETAIL_VOTE,
      payload: { threadId, userId, voteType: -1 },
    };

    // action
    const downvoteState = threadDetailReducer(initialStateWithThread, downvoteAction);
    const expectedDownvoteThread = updateVotes(sampleThreadDetail, userId, -1);

    // assert
    expect(downvoteState).toEqual({
      ...initialStateWithThread,
      threadDetail: expectedDownvoteThread,
    });


    //// Arrange (Test Neutral vote)
    const stateWithUpvote = {
      ...initialState,
      threadDetail: updateVotes(sampleThreadDetail, userId, 1),
    };
    const neutralVoteAction = {
      type: ActionType.UPDATE_THREAD_DETAIL_VOTE,
      payload: { threadId, userId, voteType: 0 },
    };

    // action
    const neutralState = threadDetailReducer(stateWithUpvote, neutralVoteAction);
    const expectedNeutralThread = updateVotes(stateWithUpvote.threadDetail, userId, 0);

    // assert
    expect(neutralState).toEqual({
      ...initialState,
      threadDetail: expectedNeutralThread,
    });


    //// Arrange (Test Non-matching threadId)
    const wrongThreadIdAction = {
      type: ActionType.UPDATE_THREAD_DETAIL_VOTE,
      payload: { threadId: 'wrong-thread', userId, voteType: 1 },
    };

    // action
    const wrongThreadIdState = threadDetailReducer(initialStateWithThread, wrongThreadIdAction);
    // assert
    expect(wrongThreadIdState).toEqual(initialStateWithThread);
  });

  it('should handle CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialStateWithThread = {
      ...initialState,
      threadDetail: sampleThreadDetail,
    };
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const state = threadDetailReducer(initialStateWithThread, action);

    // assert
    expect(state).toEqual({
      ...initialStateWithThread,
      threadDetail: null,
    });
  });
});

