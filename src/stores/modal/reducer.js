import { ActionType } from './action';

const DEFAULT_STATE = {
  isOpen: false,
  type: '',
  id: null,
};

export const modalReducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
  case ActionType.OPEN_MODAL:
    return {
      ...state,
      isOpen: true,
      type: action.payload.type || '',
      id: action.payload.id ?? null,
    };

  case ActionType.CLOSE_MODAL:
    return {
      ...state,
      isOpen: false,
      type: '',
      id: null,
    };

  default:
    return state;
  }
};