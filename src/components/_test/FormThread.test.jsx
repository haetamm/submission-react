/**
 * Test Scenarios
 *
 * - FormThread component
 *   - should renders thread form with all fields
 *   - should displays validation errors when required fields are empty
 *   - should allows category to be optional
 *   - should displays error when body is only whitespace
 *   - should handles title input correctly
 *   - should handles category input correctly
 *   - should handles body input correctly
 *   - should submits form with valid data and dispatches asyncAddThread
 *   - should disables button and shows "Loading" text
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import FormThread from '../FormThread';
import threadsReducer from '../../stores/thread/reducer';
import React from 'react';

// Mock setup
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock('../../stores/thread/action', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    asyncAddThread: vi.fn().mockImplementation((data, setLoading) => () => {
      setLoading(true);
      return new Promise((resolve) => setTimeout(() => {
        setLoading(false);
        resolve();
      }, 100));
    }),
  };
});

vi.mock('react-quill-new', () => ({
  default: ({ value, onChange }) => (
    <textarea
      data-testid="quill-editor"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}));

const renderWithProviders = (ui) => {
  const store = configureStore({
    reducer: { threads: threadsReducer },
    preloadedState: { threads: {} },
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

describe('FormThread Component', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should renders thread form with all fields', () => {
    renderWithProviders(<FormThread />);
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Category')).toBeInTheDocument();
    expect(screen.getByTestId('quill-editor')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create thread/i })).toBeInTheDocument();
  });

  it('should displays validation errors when required fields are empty', async () => {
    const { user } = renderWithProviders(<FormThread />);
    await user.click(screen.getByRole('button', { name: /create thread/i }));

    await waitFor(() => {
      expect(screen.getByText('Title must be at least 1 characters long')).toBeInTheDocument();
      expect(screen.getByText('Content must be at least 1 characters')).toBeInTheDocument();
    });
  });

  it('should allows category to be optional', async () => {
    const { user } = renderWithProviders(<FormThread />);
    await user.type(screen.getByPlaceholderText('Title'), 'My Thread');
    await user.type(screen.getByTestId('quill-editor'), 'This is the body');
    await user.click(screen.getByRole('button', { name: /create thread/i }));

    const { asyncAddThread } = await import('../../stores/thread/action');
    await waitFor(() => {
      expect(vi.mocked(asyncAddThread)).toHaveBeenCalledWith(
        {
          title: 'My Thread',
          category: '',
          body: 'This is the body',
        },
        expect.any(Function)
      );
    });
  });

  it('should displays error when body is only whitespace', async () => {
    const { user } = renderWithProviders(<FormThread />);
    await user.type(screen.getByPlaceholderText('Title'), 'My Thread');
    await user.type(screen.getByTestId('quill-editor'), '<p>   </p>');
    await user.click(screen.getByRole('button', { name: /create thread/i }));

    await waitFor(() => {
      expect(screen.getByText(/cannot be empty or just whitespace/i)).toBeInTheDocument();
    });
  });

  it('should handles title input correctly', async () => {
    const { user } = renderWithProviders(<FormThread />);
    const titleInput = screen.getByPlaceholderText('Title');
    await user.type(titleInput, 'My Thread');
    expect(titleInput).toHaveValue('My Thread');
    expect(screen.queryByText(/title must be at least 1 characters long/i)).not.toBeInTheDocument();
  });

  it('should handles category input correctly', async () => {
    const { user } = renderWithProviders(<FormThread />);
    const categoryInput = screen.getByPlaceholderText('Category');
    await user.type(categoryInput, 'General');
    expect(categoryInput).toHaveValue('General');
  });

  it('should handles body input correctly', async () => {
    const { user } = renderWithProviders(<FormThread />);
    const bodyInput = screen.getByTestId('quill-editor');
    await user.type(bodyInput, 'This is the body');
    expect(bodyInput).toHaveValue('This is the body');
    expect(screen.queryByText(/must be at least 1 characters/i)).not.toBeInTheDocument();
  });

  it('should submits form with valid data and dispatches asyncAddThread', async () => {
    const { user } = renderWithProviders(<FormThread />);
    await user.type(screen.getByPlaceholderText('Title'), 'My Thread');
    await user.type(screen.getByPlaceholderText('Category'), 'General');
    await user.type(screen.getByTestId('quill-editor'), 'This is the body');
    await user.click(screen.getByRole('button', { name: /create thread/i }));

    const { asyncAddThread } = await import('../../stores/thread/action');
    await waitFor(() => {
      expect(vi.mocked(asyncAddThread)).toHaveBeenCalledWith(
        {
          title: 'My Thread',
          category: 'General',
          body: 'This is the body',
        },
        expect.any(Function)
      );
    });
  });

  it('should disables button and shows "Loading" text', async () => {
    const { user } = renderWithProviders(<FormThread />);
    await user.type(screen.getByPlaceholderText('Title'), 'My Thread');
    await user.type(screen.getByTestId('quill-editor'), 'This is the body');

    const button = screen.getByRole('button', { name: /create thread/i });
    await user.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Loading');
    });

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent('Create Thread');
    });
  });
});