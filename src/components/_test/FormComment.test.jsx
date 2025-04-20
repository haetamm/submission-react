/**
 * Test Scenarios
 *
 * - FormComment component
 *   - should renders comment form with all elements
 *   - should displays validation error when content is empty
 *   - should displays error when content is only whitespace within HTML
 *   - should handles content input correctly
 *   - should submits form with valid data and dispatches asyncAddComment
 *   - should disables button and shows "Loading" text
 *   - should enables button and shows "Reply" text initially
 *   - should calls handleTextareaChange on input
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import FormComment from '../FormComment';
import commentReducer from '../../stores/comment/reducer';
import authUserReducer from '../../stores/authUser/reducer';
import React from 'react';

// Mock setup
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock('../../stores/comment/action', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    asyncAddComment: vi.fn().mockImplementation(({ setLoading, reset }) => () => {
      setLoading(true);
      return new Promise((resolve) => setTimeout(() => {
        setLoading(false);
        reset({ content: '' });
        resolve();
      }, 100));
    }),
  };
});

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('../../utils/helper', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    handleTextareaChange: vi.fn((event) => {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
    }),
    stripHtml: vi.fn((html) => {
      return html.replace(/<[^>]*>?/gm, '').trim();
    }),
  };
});


const renderWithProviders = (ui, preloadedState = {
  authUser: { authUser: { avatar: 'avatar-url' } },
  comment: {}
}) => {
  const store = configureStore({
    reducer: {
      authUser: authUserReducer,
      comment: commentReducer,
    },
    preloadedState,
  });
  return {
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    ),
  };
};

describe('FormComment Component', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should renders comment form with all elements', () => {
    renderWithProviders(<FormComment id="thread-1" owner={{ name: 'John Doe' }} />);
    expect(screen.getByText(/replying to/i)).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Post your reply')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reply/i })).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
  });

  it('should displays validation error when content is empty', async () => {
    const { user } = renderWithProviders(<FormComment id="thread-1" owner={{ name: 'John Doe' }} />);
    await user.click(screen.getByRole('button', { name: /reply/i }));

    await waitFor(() => {
      expect(screen.getByText('Content must be at least 1 characters')).toBeInTheDocument();
    });
  });

  it('should displays error when content is only whitespace within HTML', async () => {
    const { user } = renderWithProviders(<FormComment id="thread-1" owner={{ name: 'John Doe' }} />);
    await user.type(screen.getByPlaceholderText('Post your reply'), '<p>   </p>');
    await user.click(screen.getByRole('button', { name: /reply/i }));

    await waitFor(() => {
      expect(screen.getByText(/cannot be empty or just whitespace/i)).toBeInTheDocument();
    });
  });

  it('should handles content input correctly', async () => {
    const { user } = renderWithProviders(<FormComment id="thread-1" owner={{ name: 'John Doe' }} />);
    const textarea = screen.getByPlaceholderText('Post your reply');
    await user.type(textarea, 'This is my reply');
    expect(textarea).toHaveValue('This is my reply');
    expect(screen.queryByText(/content must be at least 1 characters/i)).not.toBeInTheDocument();
  });

  it('should submits form with valid data and dispatches asyncAddComment', async () => {
    const { user } = renderWithProviders(<FormComment id="thread-1" owner={{ name: 'John Doe' }} />);
    await user.type(screen.getByPlaceholderText('Post your reply'), 'This is my reply');
    await user.click(screen.getByRole('button', { name: /reply/i }));

    const { asyncAddComment } = await import('../../stores/comment/action');
    await waitFor(() => {
      expect(vi.mocked(asyncAddComment)).toHaveBeenCalledWith({
        data: { content: 'This is my reply' },
        id: 'thread-1',
        setLoading: expect.any(Function),
        reset: expect.any(Function),
      });
    });
  });

  it('should disables button and shows "Loading" text', async () => {
    const { user } = renderWithProviders(<FormComment id="thread-1" owner={{ name: 'John Doe' }} />);
    await user.type(screen.getByPlaceholderText('Post your reply'), 'This is my reply');

    const button = screen.getByRole('button', { name: /reply/i });
    await user.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Loading');
    });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent('Reply');
    });
  });

  it('should enables button and shows "Reply" text initially', () => {
    renderWithProviders(<FormComment id="thread-1" owner={{ name: 'John Doe' }} />);
    const button = screen.getByRole('button', { name: /reply/i });
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Reply');
  });

  it('should calls handleTextareaChange on input', async () => {
    const { user } = renderWithProviders(<FormComment id="thread-1" owner={{ name: 'John Doe' }} />);
    const textarea = screen.getByPlaceholderText('Post your reply');
    await user.type(textarea, 'This is my reply');

    const { handleTextareaChange } = await import('../../utils/helper');
    expect(handleTextareaChange).toHaveBeenCalled();
  });
});