/**
 * Test Scenarios
 *
 * - usersReducer function
 *   - should return the initial state when no action is provided
 *   - should return the initial state when given an unknown action
 *   - should handle SET_LOADING action
 *   - should handle RECEIVE_USERS action
 */

import { describe, expect, it } from 'vitest';
import usersReducer from './reducer';
import { ActionType } from './action';

// Helper function to create user objects with defaults
const createUser = (overrides = {}) => ({
  id: 'user-1',
  name: 'test',
  email: 'test123@gamil.com',
  avatar: 'https://ui-avatars.com/api/?name=test&background=random',
  ...overrides,
});

const initialState = {
  loading: false,
  users: [],
};

describe('userReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // action
    const state = usersReducer(undefined, {});
    // assert
    expect(state).toEqual(initialState);
  });

  it('should return the initial state when given an unknown action', () => {
    // action
    const nextState = usersReducer(initialState, { type: 'UNKNOWN_ACTION' });
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
    const state = usersReducer(initialState, action);
    // assert
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle RECEIVE_USERS action', () => {
    // arrange
    const users = [
      createUser(),
      createUser({
        id: 'user-2',
        name: 'test2',
        email: 'test2@gamil.com',
        avatar: 'https://ui-avatars.com/api/?name=test2&background=random',
      })
    ];

    const action = {
      type: ActionType.RECEIVE_USERS,
      payload: { users },
    };
    // action
    const state = usersReducer(initialState, action);
    // assert
    expect(state).toEqual({
      ...initialState,
      users,
    });
  });
});