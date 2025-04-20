/**
 * Test Scenarios
 *
 * - asyncReceiveThreadDetail thunk
 *   - should dispatch actions and handle success correctly
 *   - should dispatch actions and handle error correctly
 */

import NProgress from 'nprogress';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { setLoading } from '../leaderboard/action';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { asyncReceiveThreadDetail, clearThreadDetailActionCreator, receiveThreadDetailActionCreator } from './action';
import { receiveCommentsActionCreator } from '../comment/action';

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Test Thread',
  body: 'This is a test thread',
  category: 'test',
  createdAt: '2023-01-01T00:00:00Z',
  owner: {
    id: 'user-1',
    name: 'Test User',
    avatar: 'https://ui-avatars.com/api/?name=TestUserbackground=random',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};
const fakeError = new Error('Failed to fetch thread');

vi.mock('nprogress', () => ({
  default: {
    start: vi.fn(),
    done: vi.fn(),
  },
}));

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;

    // Mock toast
    toast.error = vi.fn();
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;

    delete api._getThreadDetail;

    vi.resetAllMocks();
  });

  it('should dispatch actions and handle success correctly', async () => {
    // arrange
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetail);
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail()(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));
    expect(NProgress.start).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenNthCalledWith(3, receiveThreadDetailActionCreator(fakeThreadDetail));
    expect(dispatch).toHaveBeenNthCalledWith(4, receiveCommentsActionCreator(fakeThreadDetail.comments));
    expect(dispatch).toHaveBeenNthCalledWith(5, setLoading(false));
    expect(NProgress.done).toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should dispatch actions and handle error correctly', async () => {
    // arrange
    api.getThreadDetail = () => Promise.reject(fakeError);
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail()(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));
    expect(NProgress.start).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, clearThreadDetailActionCreator());
    expect(toast.error).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenNthCalledWith(3, setLoading(false));
    expect(NProgress.done).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(receiveThreadDetailActionCreator(expect.anything()));
    expect(dispatch).not.toHaveBeenCalledWith(receiveCommentsActionCreator(expect.anything()));
  });
});