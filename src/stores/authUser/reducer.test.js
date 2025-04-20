/**
 * Test Scenarios
 *
 * - authUserReducer function
 *   - should return the initial state when no action is provided
 *   - should return the initial state when given an unknown action
 *   - should handle SET_LOADING action
 *   - should handle SET_AUTH_USER action
 *   - should handle UNSET_AUTH_USER action
 */

import { describe, expect, it } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

const sampleAuthUser = {
  id: 'user-1-',
  name: 'user 1',
  email: 'user1@gmail.com',
  avatar: 'https://ui-avatars.com/api/?name=user1&background=random'
};

const initialState = {
  loading: false,
  authUser: null
};

describe('authUserReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // action
    const state = authUserReducer(undefined, {});
    // assert
    expect(state).toEqual(initialState);
  });

  it('should return the initial state when given an unknown action', () => {
    // action
    const nextState = authUserReducer(initialState, { type: 'UNKNOWN_ACTION' });
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
    const state = authUserReducer(initialState, action);
    // assert
    expect(state).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('should handle SET_AUTH_USER action', () => {
    // arrange
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: { authUser: sampleAuthUser },
    };
    // action
    const state = authUserReducer(initialState, action);
    // assert
    expect(state).toEqual({
      ...initialState,
      authUser: sampleAuthUser,
    });
  });

  it('should handle UNSET_AUTH_USER action', () => {
    const initialStateWithAuthUser = {
      ...initialState,
      authUser: sampleAuthUser,
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };
    const state = authUserReducer(initialStateWithAuthUser, action);
    expect(state).toEqual({
      ...initialStateWithAuthUser,
      authUser: null,
    });
  });
});