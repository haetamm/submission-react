/**
 * Test Scenarios
 *
 * - FormLogin component
 *   - hould renders login form with email and password fields
 *   - should displays validation errors when fields are empty
 *   - should displays invalid email error when email is invalid
 *   - should handles email input correctly
 *   - should handles password input correctly
 *   - should submits form with valid data and dispatches asyncSetAuthUser
 *   - should disables button and shows "Loading" text when loading is true
 *   - should enables button and shows "Login" text when loading is false
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import FormLogin from '../FormLogin';
import authUserReducer from '../../stores/authUser/reducer';
import React from 'react';

// Mock setup
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock('../../stores/authUser/action', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    asyncSetAuthUser: vi.fn().mockImplementation(() => () => Promise.resolve()),
  };
});

// Test component wrapper
const renderWithProviders = (ui, preloadedState = { authUser: { loading: false } }) => {
  const store = configureStore({
    reducer: { authUser: authUserReducer },
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

describe('FormLogin Component', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should renders login form with email and password fields', () => {
    renderWithProviders(<FormLogin />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should displays validation errors when fields are empty', async () => {
    const { user } = renderWithProviders(<FormLogin />);
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('should displays invalid email error when email is invalid', async () => {
    const { user } = renderWithProviders(<FormLogin />);
    await user.type(screen.getByPlaceholderText('Email'), 'email@co');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
    });
  });

  it('should handles email input correctly', async () => {
    const { user } = renderWithProviders(<FormLogin />);
    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
    expect(screen.queryByText(/invalid email address/i)).not.toBeInTheDocument();
  });

  it('should handles password input correctly', async () => {
    const { user } = renderWithProviders(<FormLogin />);
    const passwordInput = screen.getByPlaceholderText('Password');
    await user.type(passwordInput, 'password123');
    expect(passwordInput).toHaveValue('password123');
    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
  });

  it('should submits form with valid data and dispatches asyncSetAuthUser', async () => {
    const { user } = renderWithProviders(<FormLogin />);
    await user.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    const { asyncSetAuthUser } = await import('../../stores/authUser/action');
    await waitFor(() => {
      expect(vi.mocked(asyncSetAuthUser)).toHaveBeenCalledWith(
        { email: 'test@example.com', password: 'password123' },
        expect.any(Function)
      );
    });
  });

  it('should disables button and shows "Loading" text when loading is true', () => {
    renderWithProviders(<FormLogin />, {
      authUser: { loading: true },
    });
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading');
  });

  it('should enables button and shows "Login" text when loading is false', () => {
    renderWithProviders(<FormLogin />);
    const button = screen.getByRole('button', { name: /login/i });
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Login');
  });
});