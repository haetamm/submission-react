/**
 * Test Scenarios
 *
 * - ButtonCreate component
 *   - should renders button with icon and "Create Thread" label when authenticated
 *   - should renders link with icon and "Login" label when not authenticated
 *   - should dispatches openModal with ADD type when authenticated button is clicked
 *   - should does not dispatch openModal when not authenticated
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ButtonCreate from '../ButtonCreate';
import usePermission from '../../hooks/usePermission';
import { openModal } from '../../stores/modal/action';
import React from 'react';
import { typeModal, urlPage } from '../../utils/constans';

// Mock dependencies
vi.mock('../../hooks/usePermission', () => ({
  default: vi.fn(),
}));

vi.mock('../../stores/modal/action', () => ({
  openModal: vi.fn(() => ({ type: 'OPEN_MODAL', payload: typeModal.ADD })),
}));

// Mock reducer to handle the OPEN_MODAL action
const modalReducer = (state = { type: null }, action) => {
  switch (action.type) {
  case 'OPEN_MODAL':
    return { ...state, type: action.payload };
  default:
    return state;
  }
};

const createStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      modal: modalReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

const renderWithProviders = (ui, { isAuthenticated = true, store = createStore() } = {}) => {
  usePermission.mockReturnValue({ isAuthenticated });

  return {
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    ),
  };
};

describe('ButtonCreate Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should renders button with icon and "Create Thread" label when authenticated', () => {
    renderWithProviders(<ButtonCreate />, { isAuthenticated: true });

    const button = screen.getByRole('button', { name: /add thread/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Create Thread');
    expect(button.querySelector('svg')).toHaveClass('button-icon');
  });

  it('should renders link with icon and "Login" label when not authenticated', () => {
    renderWithProviders(<ButtonCreate />, { isAuthenticated: false });

    const link = screen.getByRole('link', { name: /add thread/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent('Login');
    expect(link).toHaveAttribute('href', urlPage.LOGIN);
    expect(link.querySelector('svg')).toHaveClass('button-icon');
  });

  it('should dispatches openModal with ADD type when authenticated button is clicked', async () => {
    const store = createStore();
    const { user } = renderWithProviders(<ButtonCreate />, { isAuthenticated: true, store });

    const button = screen.getByRole('button', { name: /add thread/i });
    await user.click(button);

    expect(openModal).toHaveBeenCalledWith(typeModal.ADD);
    expect(store.getState().modal.type).toBe(typeModal.ADD);
  });

  it('should does not dispatch openModal when not authenticated', async () => {
    const { user } = renderWithProviders(<ButtonCreate />, { isAuthenticated: false });

    const link = screen.getByRole('link', { name: /add thread/i });
    await user.click(link);

    expect(openModal).not.toHaveBeenCalled();
  });
});