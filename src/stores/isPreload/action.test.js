/**
 * Test Scenarios
 *
 * - asyncPreloadProcess thunk
 *   - should dispatch actions and handle success with token correctly
 *   - should dispatch actions correctly when no token is present
 *   - should dispatch actions and handle error correctly
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';

// Mock data
const fakeToken = 'fake-token';
const fakeAuthUser = {
  id: 'user-1-',
  name: 'User1',
  email: 'user@gmail.com',
  avatar: 'https://ui-avatars.com/api/?name=User&background=random'
};
const fakeError = new Error('Failed to fetch profile');

// Mock setLoading
const mockSetLoading = vi.fn();

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    api._getAccessToken = api.getAccessToken;
    api._getOwnProfile = api.getOwnProfile;

    // Mock toast
    toast.error = vi.fn();
  });

  afterEach(() => {
    api.getAccessToken = api._getAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._getAccessToken;
    delete api._getOwnProfile;

    vi.resetAllMocks();
  });

  it('should dispatch actions and handle success with token correctly', async () => {
    // arrange
    api.getAccessToken = () => fakeToken;
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess(mockSetLoading)(dispatch);

    // assert
    expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(mockSetLoading).toHaveBeenNthCalledWith(2, false);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should dispatch actions correctly when no token is present', async () => {
    // arrange
    api.getAccessToken = () => null;
    api.getOwnProfile = vi.fn();
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess(mockSetLoading)(dispatch);

    // assert
    expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(api.getOwnProfile).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(mockSetLoading).toHaveBeenNthCalledWith(2, false);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should dispatch actions and handle error correctly', async () => {
    // arrange
    api.getAccessToken = () => fakeToken;
    api.getOwnProfile = () => Promise.reject(fakeError);
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess(mockSetLoading)(dispatch);

    // assert
    expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
    expect(toast.error).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(mockSetLoading).toHaveBeenNthCalledWith(2, false);
  });
});