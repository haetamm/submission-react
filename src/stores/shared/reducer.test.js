/**
 * Test Scenarios
 *
 * - sharedReducer function
 *   - should return the initial state when no action is provided
 *   - should handle SET_LOADING action
 *   - should return current state for unknown action type
 */

import { describe, expect, it } from 'vitest';
import sharedReducer from './reducer';
import { ActionType } from './action';

describe('sharedReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    const state = sharedReducer(undefined, {});
    expect(state).toEqual(false);
  });

  it('should handle SET_LOADING action', () => {
    const action = {
      type: ActionType.SET_LOADING,
      payload: { loading: true },
    };
    const state = sharedReducer(false, action);
    expect(state).toEqual({ loading: true });
  });

  it('should return current state for unknown action type', () => {
    const unknownAction = {
      type: 'UNKNOWN_ACTION',
      payload: { loading: true },
    };
    const stateFalse = sharedReducer(false, unknownAction);
    expect(stateFalse).toEqual(false);

    const stateTrue = sharedReducer({ loading: true }, unknownAction);
    expect(stateTrue).toEqual({ loading: true });
  });
});