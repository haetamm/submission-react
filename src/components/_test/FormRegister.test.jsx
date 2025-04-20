/**
 * Test Scenarios
 *
 * - FormRegister component
 *   - hould renders register form with email and password fields
 *   - should displays validation errors when fields are empty
 *   - should displays error when password and confirmation do not match
 *   - should displays error when password does not meet requirements
 *   - should handles name input correctly
 *   - should handles email input correctly
 *   - should handles password input correctly
 *   - should submits form with valid data and dispatches asyncRegisterUser
 *   - should disables button and shows "Loading" text when loading is true
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import FormRegister from '../FormRegister';
import userReducer from '../../stores/user/reducer';
import React from 'react';

// Mock setup
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => vi.fn() };
});

vi.mock('../../stores/user/action', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    asyncRegisterUser: vi.fn().mockImplementation(() => () => Promise.resolve()),
  };
});

// Test component wrapper
const renderWithProviders = (ui, preloadedState = { users: { loading: false } }) => {
  const store = configureStore({
    reducer: { users: userReducer },
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

describe('FormRegister Component', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should renders register form with all fields', () => {
    renderWithProviders(<FormRegister />);
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password Confirmation')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('should displays validation errors when fields are empty', async () => {
    const { user } = renderWithProviders(<FormRegister />);
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 1 characters long/i)).toBeInTheDocument();
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
      expect(screen.getByText(/minimum 6 characters/i)).toBeInTheDocument();
    });
  });

  it('should displays error when password and confirmation do not match', async () => {
    const { user } = renderWithProviders(<FormRegister />);
    await user.type(screen.getByPlaceholderText('Name'), 'John');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'pass123');
    await user.type(screen.getByPlaceholderText('Password Confirmation'), 'pass124');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('should displays error when password does not meet requirements', async () => {
    const { user } = renderWithProviders(<FormRegister />);
    await user.type(screen.getByPlaceholderText('Name'), 'John');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'pass');
    await user.type(screen.getByPlaceholderText('Password Confirmation'), 'pass');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/minimum 6 characters/i)).toBeInTheDocument();
    });

    // Test karakter non-alphanumeric
    await user.clear(screen.getByPlaceholderText('Password'));
    await user.type(screen.getByPlaceholderText('Password'), 'pass@123');
    await user.clear(screen.getByPlaceholderText('Password Confirmation'));
    await user.type(screen.getByPlaceholderText('Password Confirmation'), 'pass@123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/password must contain only alphanumeric characters/i)).toBeInTheDocument();
    });
  });

  it('should handles name input correctly', async () => {
    const { user } = renderWithProviders(<FormRegister />);
    const nameInput = screen.getByPlaceholderText('Name');
    await user.type(nameInput, 'John');
    expect(nameInput).toHaveValue('John');
    expect(screen.queryByText(/name must be at least 1 characters long/i)).not.toBeInTheDocument();
  });

  it('should handles email input correctly', async () => {
    const { user } = renderWithProviders(<FormRegister />);
    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'john@example.com');
    expect(emailInput).toHaveValue('john@example.com');
    expect(screen.queryByText(/invalid email address/i)).not.toBeInTheDocument();
  });

  it('should handles password input correctly', async () => {
    const { user } = renderWithProviders(<FormRegister />);
    const passwordInput = screen.getByPlaceholderText('Password');
    await user.type(passwordInput, 'pass123');
    expect(passwordInput).toHaveValue('pass123');
    expect(screen.queryByText(/minimum 6 characters/i)).not.toBeInTheDocument();
  });

  it('should submits form with valid data and dispatches asyncRegisterUser', async () => {
    const { user } = renderWithProviders(<FormRegister />);
    await user.type(screen.getByPlaceholderText('Name'), 'John');
    await user.type(screen.getByPlaceholderText('Email'), 'john@example.com');
    await user.type(screen.getByPlaceholderText('Password'), 'pass123');
    await user.type(screen.getByPlaceholderText('Password Confirmation'), 'pass123');
    await user.click(screen.getByRole('button', { name: /create account/i }));

    const { asyncRegisterUser } = await import('../../stores/user/action');
    await waitFor(() => {
      expect(vi.mocked(asyncRegisterUser)).toHaveBeenCalledWith(
        {
          name: 'John',
          email: 'john@example.com',
          password: 'pass123',
          passwordConfirmation: 'pass123',
        },
        expect.any(Function)
      );
    });
  });

  it('should disables button and shows "Loading" text when loading is true', () => {
    renderWithProviders(<FormRegister />, {
      users: { loading: true },
    });
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading');
  });

  it('enables button and shows "Create Account" text when loading is false', () => {
    renderWithProviders(<FormRegister />);
    const button = screen.getByRole('button', { name: /create account/i });
    expect(button).not.toBeDisabled();
    expect(button).toHaveTextContent('Create Account');
  });
});