/**
 * Test Scenarios
 *
 * - isPreloadReducer function
 *   - should return the initial state when no action is provided
 *   - should handle SET_IS_PRELOAD action
 *   - should return current state for unknown action type
 */

import { describe, expect, it } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // action
    const state = isPreloadReducer(undefined, {});
    // assert
    expect(state).toEqual(true);
  });

  it('should handle SET_IS_PRELOAD action', () => {
    // arrange
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: { isPreload: false },
    };
    // action
    const state = isPreloadReducer(false, action);
    // assert
    expect(state).toEqual({ isPreload: false });
  });

  it('should return current state for unknown action type', () => {
    // arrange
    const unknownAction = {
      type: 'UNKNOWN_ACTION',
      payload: { isPreload: false },
    };
    // action
    const stateFalse = isPreloadReducer(false, unknownAction);
    // asssert
    expect(stateFalse).toEqual(false);

    // action
    const stateTrue = isPreloadReducer(true, unknownAction);
    // assert
    expect(stateTrue).toEqual(true);
  });
});