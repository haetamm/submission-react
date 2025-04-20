/**
 * Test Scenarios
 *
 * - threadReducer function
 *   - should return the initial state when no action is provided
 *   - should return the initial state when given an unknown action
 *   - should return state with new threads when given RECEIVE_THREADS action
 *   - should add new thread to existing threads when given ADD_THREAD action
 *   - should handle UPDATE_THREAD_VOTE for upvote, downvote, neutral vote, and non-matching threadId
 */

import { describe, expect, it } from 'vitest';
import threadReducer from './reducer';
import { ActionType } from './action';
import { updateVotes } from '../../utils/helper';

// Helper function to create thread objects with defaults
const createThread = (overrides = {}) => ({
  id: 'thread-1',
  title: 'Thread 1',
  body: 'Thread 1',
  category: 'general',
  createdAt: '2023-05-29T07:55:52.266Z',
  ownerId: 'user-1',
  totalComments: 0,
  upVotesBy: [],
  downVotesBy: [],
  ...overrides,
});

const initialState = { threads: [] };

describe('threadReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // action
    const state = threadReducer(undefined, {});
    // assert
    expect(state).toEqual(initialState);
  });

  it('should return the initial state when given an unknown action', () => {
    // action
    const nextState = threadReducer(initialState, { type: 'UNKNOWN_ACTION' });
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return state with new threads when given RECEIVE_THREADS action', () => {
    // arrange
    const threads = [
      createThread(),
      createThread({
        id: 'thread-2',
        title: 'Thread 2',
        body: 'Body 2',
        category: 'category-2',
        createdAt: '2025-05-29T07:55:52.266Z',
        ownerId: 'user-2',
        totalComments: 0,
        upVotesBy: [],
        downVotesBy: [],
      }),
    ];

    // action
    const nextState = threadReducer(initialState, {
      type: ActionType.RECEIVE_THREADS,
      payload: { threads },
    });

    // assert
    expect(nextState).toEqual({ threads });
  });

  it('should add new thread to existing threads when given ADD_THREAD action', () => {
    // arrange
    const initialThread = createThread();

    const newThread = createThread({
      id: 'thread-2',
      title: 'Thread 2',
      body: 'Body 2',
      category: 'category-2',
      createdAt: '2025-05-29T07:55:52.266Z',
      ownerId: 'user-2',
      totalComments: 0,
      upVotesBy: [],
      downVotesBy: [],
    });

    const initialState = { threads: [initialThread] };

    // action
    const nextState = threadReducer(initialState, {
      type: ActionType.ADD_THREAD,
      payload: { thread: newThread },
    });

    // assert
    expect(nextState).toEqual({
      threads: [newThread, initialThread],
    });
  });

  it('should handle UPDATE_THREAD_VOTE for upvote, downvote, neutral vote, and non-matching threadId', () => {
    // arrange
    const thread = createThread();
    const initialState = { threads: [thread] };
    const userId = 'user-1';
    const threadId = 'thread-1';

    //// Action: Test upvote
    const upvoteState = threadReducer(initialState, {
      type: ActionType.UPDATE_THREAD_VOTE,
      payload: { threadId, userId, voteType: 1 },
    });
    const expectedUpvoteThread = updateVotes(thread, userId, 1);

    // assert
    expect(upvoteState).toEqual({ threads: [expectedUpvoteThread] });


    //// Action: Test downvote
    const downvoteState = threadReducer(upvoteState, {
      type: ActionType.UPDATE_THREAD_VOTE,
      payload: { threadId, userId, voteType: -1 },
    });
    const expectedDownvoteThread = updateVotes(expectedUpvoteThread, userId, -1);

    // assert
    expect(downvoteState).toEqual({ threads: [expectedDownvoteThread] });


    //// Action: Test neutralvote
    const neutralVote = threadReducer(upvoteState, {
      type: ActionType.UPDATE_THREAD_VOTE,
      payload: { threadId, userId, voteType: 0 },
    });
    const expectedNeutralvoteThread = updateVotes(expectedUpvoteThread, userId, 0);

    // assert
    expect(neutralVote).toEqual({ threads: [expectedNeutralvoteThread] });


    //// Arrange (Test Non-matching threadId)
    const wrongThreadIdAction = {
      type: ActionType.UPDATE_THREAD_VOTE,
      payload: { threadId: 'wrong-thread', userId, voteType: 1 },
    };

    // action
    const wrongThreadIdState = threadReducer(initialState, wrongThreadIdAction);

    // assert
    expect(wrongThreadIdState).toEqual(initialState);
  });
});