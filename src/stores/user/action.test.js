/**
 * Test Scenarios
 *
 * - asyncRegisterUser thunk
 *   - should dispatch actions correctly and navigate on successful register
 *   - should dispatch loading actions and show toast error on failed register
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { asyncRegisterUser, setLoading } from './action';
import { urlPage } from '../../utils/constans';

const fakeCredentials = {
  name: 'Test',
  email: 'test@example.com',
  password: 'password123',
};

const fakeError = new Error('Something wrong');

// Mock navigate function
const mockNavigate = vi.fn();

describe('auth actions', () => {
  beforeEach(() => {
    api._register = api.register;

    // Mock toast
    toast.error = vi.fn();
    toast.success = vi.fn();
  });

  afterEach(() => {
    api.register = api._register;

    delete api._register;

    // Reset mocks
    vi.resetAllMocks();
  });

  // Test asyncRegisterUser thunk
  describe('asyncRegisterUser thunk', () => {
    it('should dispatch actions correctly and navigate on successful register', async () => {
      // arrange
      api.register = vi.fn(() => Promise.resolve());
      const dispatch = vi.fn();

      // action
      await asyncRegisterUser(fakeCredentials, mockNavigate)(dispatch);

      // Assert
      expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));
      expect(api.register).toHaveBeenCalledWith(fakeCredentials);
      expect(mockNavigate).toHaveBeenCalledWith(urlPage.LOGIN);
      expect(toast.success).toHaveBeenCalledWith(`selamat ${fakeCredentials.name}, silahkan login`);
      expect(toast.error).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(2, setLoading(false));
    });

    it('should dispatch loading actions and show toast error on failed register', async () => {
      // arrange
      api.register = vi.fn(() => Promise.reject(fakeError));
      const dispatch = vi.fn();

      // action
      await asyncRegisterUser(fakeCredentials, mockNavigate)(dispatch);

      // assert
      expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));
      expect(api.register).toHaveBeenCalledWith(fakeCredentials);
      expect(toast.error).toHaveBeenCalledWith(fakeError.message);
      expect(toast.success).not.toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(2, setLoading(false));
    });
  });
});