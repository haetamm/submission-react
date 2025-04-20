/**
 * Test Scenarios
 *
 * - modalReducer function
 *   - should return the initial state when no action is provided
 *   - should return the current state when an unknown action is provided
 *   - should handle OPEN_MODAL action and open modal with type and id
 *   - should handle OPEN_MODAL action with partial payload
 *   - should handle CLOSE_MODAL action and reset modal state
 */

import { describe, expect, it } from 'vitest';
import { modalReducer } from './reducer';
import { ActionType } from './action';
import { typeModal } from '../../utils/constans';

const initialState = {
  isOpen: false,
  type: '',
  id: null,
};

describe('modalReducer', () => {
  it('should return the initial state when no action is provided', () => {
    // action
    const nextState = modalReducer(undefined, {});
    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the current state when an unknown action is provided', () => {
    // action
    const nextState = modalReducer(initialState, { type: 'UNKNOWN_ACTION' });
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should handle OPEN_MODAL action and open modal with type and id', () => {
    // arrange
    const action = {
      type: ActionType.OPEN_MODAL,
      payload: { type: typeModal.ADD, id: '123' },
    };
    const expectedState = {
      isOpen: true,
      type: typeModal.ADD,
      id: '123',
    };

    // action
    const nextState = modalReducer(initialState, action);

    // assert
    expect(nextState).toEqual(expectedState);
  });

  it('should handle OPEN_MODAL action with partial payload', () => {
    // arrange
    const actionWithoutId = {
      type: ActionType.OPEN_MODAL,
      payload: { type: typeModal.ADD }, // Tanpa id
    };
    const actionWithoutType = {
      type: ActionType.OPEN_MODAL,
      payload: { id: '456' }, // Tanpa type
    };
    const expectedStateWithoutId = {
      isOpen: true,
      type: typeModal.ADD,
      id: null,
    };
    const expectedStateWithoutType = {
      isOpen: true,
      type: '',
      id: '456',
    };

    // action
    const nextStateWithoutId = modalReducer(initialState, actionWithoutId);
    const nextStateWithoutType = modalReducer(initialState, actionWithoutType);

    // assert
    expect(nextStateWithoutId).toEqual(expectedStateWithoutId);
    expect(nextStateWithoutType).toEqual(expectedStateWithoutType);
  });

  it('should handle CLOSE_MODAL action and reset modal state', () => {
    // arrange
    const initialState = {
      isOpen: true,
      type: typeModal.LOGOUT,
      id: '123',
    };

    const action = {
      type: ActionType.CLOSE_MODAL,
    };

    const expectedState = {
      isOpen: false,
      type: '',
      id: null,
    };

    // action
    const nextState = modalReducer(initialState, action);

    // assert
    expect(nextState).toEqual(expectedState);
  });
});