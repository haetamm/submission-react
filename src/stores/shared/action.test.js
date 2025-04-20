/**
 * Test Scenarios
 *
 * - asyncPopulateUsersAndThreads thunk
 *   - should dispatch actions and handle success correctly
 *   - should dispatch actions and handle error correctly
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import { receiveUsersActionCreator } from '../user/action';
import { receiveThreadsActionCreator } from '../thread/action';
import NProgress from 'nprogress';
import { asyncPopulateUsersAndThreads, setLoading } from './action';


// Mock data
const createUser = (overrides = {}) => ({
  id: 'user-1',
  name: 'test',
  email: 'test123@gamil.com',
  avatar: 'https://ui-avatars.com/api/?name=test&background=random',
  ...overrides,
});
const createThread = (overrides = {}) => ({
  id: 'thread-1',
  title: 'Thread 1',
  body: 'Thread 1',
  category: 'general',
  createdAt: '2023-05-29T07:55:52.266Z',
  ownerId: 'user-1',
  totalComments: 0,
  upVotesBy: [],
  downVotesBy: [],
  ...overrides,
});
const fakeUsers = [
  createUser(),
  createUser({
    id: 'user-1',
    name: 'test',
  })
];
const fakeThreads = [
  createThread(),
  createThread({
    id: 'thread-1',
    title: 'Thread 2',
  })
];
const fakeError = new Error('Failed to fetch data');

vi.mock('nprogress', () => ({
  default: {
    start: vi.fn(),
    done: vi.fn(),
  },
}));

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;

    // Mock toast
    toast.error = vi.fn();
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;

    vi.resetAllMocks();
  });

  it('should dispatch actions and handle success correctly', async () => {
    // arrange
    api.getAllUsers = () => Promise.resolve(fakeUsers);
    api.getAllThreads = () => Promise.resolve(fakeThreads);
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));
    expect(NProgress.start).toHaveBeenCalled();
    expect(dispatch).toHaveBeenNthCalledWith(2, receiveUsersActionCreator(fakeUsers));
    expect(dispatch).toHaveBeenNthCalledWith(3, receiveThreadsActionCreator(fakeThreads));
    expect(dispatch).toHaveBeenNthCalledWith(4, setLoading(false));
    expect(NProgress.done).toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('should dispatch actions and handle error correctly', async () => {
    // arrange
    api.getAllUsers = () => Promise.reject(fakeError);
    api.getAllThreads = () => Promise.reject(fakeError);
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenNthCalledWith(1, setLoading(true));
    expect(NProgress.start).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(fakeError.message);
    expect(dispatch).toHaveBeenNthCalledWith(2, setLoading(false));
    expect(NProgress.done).toHaveBeenCalled();
    expect(dispatch).not.toHaveBeenCalledWith(receiveUsersActionCreator(expect.anything()));
    expect(dispatch).not.toHaveBeenCalledWith(receiveThreadsActionCreator(expect.anything()));
  });
});