/**
 * Test Scenarios
 *
 * - asyncReceiveLeaderboard thunk
 *   - should dispatch actions and handle success correctly
 *   - should dispatch actions and handle error correctly
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'react-toastify';
import NProgress from 'nprogress';
import api from '../../utils/api';
import {
  asyncReceiveLeaderboard,
  setLoading,
  receiveLeaderboardActionCreator,
  clearLeaderboardActionCreator,
} from './action';

// Mock data
const createLeaderboard = (overrides = {}) => ({
  user: {
    id: 'user-1',
    name: 'User',
    email: 'user@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=User&background=random'
  },
  score: 0,
  ...overrides,
});

const fakeLeaderboard = [
  createLeaderboard(),
  createLeaderboard({
    user: {
      id: 'user-2',
      name: 'User 2',
    },
    score: 100,
  })
];
const fakeError = new Error('Failed to fetch leaderboard');

vi.mock('nprogress', () => ({
  default: {
    start: vi.fn(),
    done: vi.fn(),
  },
}));

describe('asyncReceiveLeaderboard thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;

    // Mock toast
    toast.error = vi.fn();
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    delete api._getLeaderboards;

    vi.resetAllMocks();
  });

  it('should dispatch actions and handle success correctly', async () => {
    // arrange
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboard);
    const dispatch = vi.fn();

    // action
    await asyncReceiveLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));
    expect(NProgress.start).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, clearLeaderboardActionCreator());
    expect(dispatch).toHaveBeenNthCalledWith(3, receiveLeaderboardActionCreator(fakeLeaderboard));
    expect(dispatch).toHaveBeenNthCalledWith(4, setLoading(false));
    expect(NProgress.done).toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should dispatch actions and handle error correctly', async () => {
    // arrange
    api.getLeaderboards = () => Promise.reject(fakeError);
    const dispatch = vi.fn();

    // action
    await asyncReceiveLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));
    expect(NProgress.start).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, clearLeaderboardActionCreator());
    expect(toast.error).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenNthCalledWith(3, setLoading(false));
    expect(NProgress.done).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(receiveLeaderboardActionCreator(expect.anything()));
  });
});