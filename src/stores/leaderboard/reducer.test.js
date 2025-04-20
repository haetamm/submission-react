/**
 * Test Scenarios
 *
 * - leaderboardReducer function
 *   - should return the initial state when no action is provided
 *   - should return the initial state when given an unknown action
 *   - should handle SET_LOADING action
 *   - should handle RECEIVE_LEADERBOARD action
 *   - should handle CLEAR_LEADERBOARD action
 */

import { describe, expect, it } from 'vitest';
import leaderboardReducer from './reducer';
import { ActionType } from './action';

// Helper function to create leaderboard objects with defaults
const createLeaderboard = (overrides = {}) => ({
  user: {
    id: 'user-1',
    name: 'User',
    email: 'user@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=User&background=random'
  },
  score: 0,
  ...overrides,
});

const initialState = {
  loading: false,
  leaderboards: [],
};

describe('leaderboardReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // action
    const state = leaderboardReducer(undefined, {});
    // assert
    expect(state).toEqual(initialState);
  });

  it('should return the initial state when given an unknown action', () => {
    // action
    const nextState = leaderboardReducer(initialState, { type: 'UNKNOWN_ACTION' });
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
    const state = leaderboardReducer(initialState, action);
    // assert
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle RECEIVE_LEADERBOARD action', () => {
    // arrange
    const leaderboards = [
      createLeaderboard(),
      createLeaderboard({
        user: {
          id: 'user-2',
          name: 'User 2',
          email: 'user2@gmail.com',
          avatar: 'https://ui-avatars.com/api/?name=User2&background=random'
        },
        score: 100,
      })
    ];

    const action = {
      type: ActionType.RECEIVE_LEADERBOARD,
      payload: { leaderboards },
    };
    // action
    const state = leaderboardReducer(initialState, action);
    // assert
    expect(state).toEqual({
      ...initialState,
      leaderboards,
    });
  });

  it('should handle CLEAR_LEADERBOARD action', () => {
    // arrange
    const leaderboards = [
      createLeaderboard(),
      createLeaderboard({
        id: 'user-2',
        name: 'test2',
        email: 'test2@gamil.com',
        avatar: 'https://ui-avatars.com/api/?name=test2&background=random',
      })
    ];

    const initialStateWithLeaderboards = {
      ...initialState,
      leaderboards,
    };

    const action = {
      type: ActionType.CLEAR_LEADERBOARD,
    };

    // action
    const state = leaderboardReducer(initialStateWithLeaderboards, action);

    // assert
    expect(state).toEqual({
      ...initialStateWithLeaderboards,
      leaderboards: [],
    });
  });
});