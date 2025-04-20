/**
 * Test Scenarios
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch actions correctly and navigate on successful login
 *   - should dispatch loading actions and show toast error on failed login
 *
 * - asyncUnsetAuthUser thunk
 *   - should dispatch unset action and remove access token
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { urlPage } from '../../utils/constans';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  setLoading,
  unsetAuthUserActionCreator,
} from './action';
import { closeModal } from '../modal/action';

// Mock data
const fakeToken = 'fake-token';
const fakeAuthUser = {
  id: 'user-1-',
  name: 'User1',
  email: 'user@gmail.com',
  avatar: 'https://ui-avatars.com/api/?name=User&background=random'
};
const fakeError = new Error('email or password is wrong');
const fakeCredentials = {
  email: 'test@example.com',
  password: 'password123',
};

// Mock navigate function
const mockNavigate = vi.fn();

describe('auth actions', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
    api._removeAccessToken = api.removeAccessToken;

    // Mock toast
    toast.error = vi.fn();
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;
    api.removeAccessToken = api._removeAccessToken;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
    delete api._removeAccessToken;

    // Reset mocks
    vi.resetAllMocks();
  });

  describe('asyncSetAuthUser thunk', () => {
    it('should dispatch actions correctly and navigate on successful login', async () => {
      // arrange
      api.login = () => Promise.resolve(fakeToken);
      api.putAccessToken = vi.fn();
      api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

      const dispatch = vi.fn();

      // action
      await asyncSetAuthUser(fakeCredentials, mockNavigate)(dispatch);

      // Assert
      expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));
      expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
      expect(dispatch).toHaveBeenNthCalledWith(2, setAuthUserActionCreator(fakeAuthUser));
      expect(mockNavigate).toHaveBeenCalledWith(urlPage.HOME);
      expect(toast.error).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(3, setLoading(false));
    });

    it('should dispatch loading actions and show toast error on failed login', async () => {
      // arrange
      api.login = () => Promise.reject(fakeError);
      api.putAccessToken = vi.fn();
      api.getOwnProfile = vi.fn();

      const dispatch = vi.fn();

      // action
      await asyncSetAuthUser(fakeCredentials, mockNavigate)(dispatch);

      // assert
      expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));
      expect(api.putAccessToken).not.toHaveBeenCalled();
      expect(api.getOwnProfile).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(fakeError.message);
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(dispatch).toHaveBeenNthCalledWith(2, setLoading(false));
    });
  });

  // Test asyncUnsetAuthUser thunk
  describe('asyncUnsetAuthUser thunk', () => {
    it('should dispatch unset action and remove access token', () => {
      // Arrange
      api.removeAccessToken = vi.fn();
      const dispatch = vi.fn();

      // Act
      asyncUnsetAuthUser()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      expect(dispatch).toHaveBeenCalledWith(closeModal());
      expect(api.removeAccessToken).toHaveBeenCalled();
    });
  });
});