/**
 * Test Scenarios
 *
 * - ButtonVote component
 *   - should renders like button correctly
 *   - should renders dislike button correctly
 *   - should shows correct vote count
 *   - should applies active class when user has voted
 *   - should does not dispatch action when user is not logged in
 *   - should dispatches upVote action when clicking like button and not voted
 *   - should dispatches downVote action when clicking dislike button and not voted
 *   - should dispatches neutralVote action when clicking and already voted
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import ButtonVote from '../ButtonVote';

// Mock react-icons
vi.mock('react-icons/ai', () => ({
  AiFillLike: ({ className, onClick }) => (
    <div data-testid="like-icon" className={className} onClick={onClick}>
      Like Icon
    </div>
  ),
  AiFillDislike: ({ className, onClick }) => (
    <div data-testid="dislike-icon" className={className} onClick={onClick}>
      Dislike Icon
    </div>
  ),
}));

const initialState = {
  authUser: {
    authUser: null
  }
};

// Mock store
const mockStore = {
  getState: () => initialState,
  subscribe: vi.fn(),
  dispatch: vi.fn(),
  replaceReducer: vi.fn(),
};

const setAuthUser = (user) => {
  initialState.authUser.authUser = user;
};

describe('ButtonVote Component', () => {
  const mockUpVote = { type: 'UP_VOTE' };
  const mockDownVote = { type: 'DOWN_VOTE' };
  const mockNeutralVote = { type: 'NEUTRAL_VOTE' };

  beforeEach(() => {
    initialState.authUser.authUser = null;
    mockStore.dispatch.mockClear();
  });

  const renderComponent = (props = {}) => {
    const defaultProps = {
      votes: [],
      type: 'like',
      upVote: mockUpVote,
      downVote: mockDownVote,
      neutralVote: mockNeutralVote,
      ...props,
    };

    return render(
      <Provider store={mockStore}>
        <ButtonVote {...defaultProps} />
      </Provider>
    );
  };

  it('should renders like button correctly', () => {
    renderComponent();
    expect(screen.getByTestId('like-icon')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should renders dislike button correctly', () => {
    renderComponent({ type: 'dislike' });
    expect(screen.getByTestId('dislike-icon')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('should shows correct vote count', () => {
    renderComponent({ votes: ['user1', 'user2', 'user3'] });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should applies active class when user has voted', () => {
    setAuthUser({ id: 'user1' });
    renderComponent({ votes: ['user1'] });
    const icon = screen.getByTestId('like-icon');
    expect(icon).toHaveClass('active');
  });

  it('should does not dispatch action when user is not logged in', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('like-icon'));
    expect(mockStore.dispatch).not.toHaveBeenCalled();
  });

  it('should dispatches upVote action when clicking like button and not voted', () => {
    setAuthUser({ id: 'user1' });
    renderComponent({ votes: [] });
    fireEvent.click(screen.getByTestId('like-icon'));
    expect(mockStore.dispatch).toHaveBeenCalledWith(mockUpVote);
  });

  it('should dispatches downVote action when clicking dislike button and not voted', () => {
    setAuthUser({ id: 'user1' });
    renderComponent({ type: 'dislike', votes: [] });
    fireEvent.click(screen.getByTestId('dislike-icon'));
    expect(mockStore.dispatch).toHaveBeenCalledWith(mockDownVote);
  });

  it('should dispatches neutralVote action when clicking and already voted', () => {
    setAuthUser({ id: 'user1' });
    renderComponent({ votes: ['user1'] });
    fireEvent.click(screen.getByTestId('like-icon'));
    expect(mockStore.dispatch).toHaveBeenCalledWith(mockNeutralVote);
  });
});