/**
 * Test Scenarios
 *
 * - asyncAddThread thunk
 *   - should dispatch actions correctly and show toast on success
 *   - should dispatch loading and show toast error on failure
 *
 * - asyncUpVoteThread thunk
 *   - should dispatch actions correctly on success
 *   - should dispatch rollback actions and show toast error on failure
 *
 * - asyncDownVoteThread thunk
 *   - should dispatch actions correctly on success
 *   - should dispatch rollback actions and show toast error on failure
 *
 * - asyncNeutralVoteThread thunk
 *   - should dispatch actions correctly on success
 *   - should dispatch rollback actions and show toast error on failure
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import {
  asyncAddThread,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  addThreadActionCreator,
  updateThreadVoteActionCreator,
  receiveThreadsActionCreator,
} from './action';
import { closeModal } from '../modal/action';
import { receiveThreadDetailActionCreator, updateThreadDetailVoteActionCreator } from '../threadDetail/action';

// Mock data
const fakeThread = {
  id: 'thread-1',
  title: 'Thread 1',
  body: 'Thread 1',
  category: 'general',
  createdAt: '2023-05-29T07:55:52.266Z',
  ownerId: 'user-1',
  totalComments: 0,
  upVotesBy: [],
  downVotesBy: [],
};

const fakeCredentials = {
  title: 'Test Thread',
  body: 'This is a test thread',
  category: 'test',
};

const fakeError = new Error('Something went wrong');

const fakeThreadsState = {
  threads: [
    {
      id: 'thread-1',
      title: 'Thread 1',
      body: 'Thread 1',
      category: 'general',
      createdAt: '2023-05-29T07:55:52.266Z',
      ownerId: 'user-1',
      totalComments: 0,
      upVotesBy: [],
      downVotesBy: [],
    }
  ],
};

const fakeThreadDetailState = {
  threadDetail: {
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
  },
};

const mockSetLoading = vi.fn();


describe('thread thunks', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
    api._upVoteThread = api.upVoteThread;
    api._downVoteThread = api.downVoteThread;
    api._neutralVoteThread = api.neutralVoteThread;

    toast.success = vi.fn();
    toast.error = vi.fn();
  });

  afterEach(() => {
    api.createThread = api._createThread;
    api.upVoteThread = api._upVoteThread;
    api.downVoteThread = api._downVoteThread;
    api.neutralVoteThread = api._neutralVoteThread;

    delete api._createThread;
    delete api._upVoteThread;
    delete api._downVoteThread;
    delete api._neutralVoteThread;

    vi.resetAllMocks();
  });

  describe('asyncAddThread', () => {
    it('should dispatch actions correctly and show toast on success', async () => {
      // arrange
      api.createThread = vi.fn(() => Promise.resolve(fakeThread));
      const dispatch = vi.fn();

      // action
      await asyncAddThread(fakeCredentials, mockSetLoading)(dispatch);

      // assert
      expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
      expect(api.createThread).toHaveBeenCalledWith(fakeCredentials);
      expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThread));
      expect(dispatch).toHaveBeenCalledWith(closeModal());
      expect(toast.success).toHaveBeenCalledWith('Thread berhasil dikirim');
      expect(toast.error).not.toHaveBeenCalled();
      expect(mockSetLoading).toHaveBeenNthCalledWith(2, false);
    });

    it('should dispatch loading and show toast error on failure', async () => {
      // Arrange
      api.createThread = vi.fn(() => Promise.reject(fakeError));
      const dispatch = vi.fn();

      // Action
      await asyncAddThread(fakeCredentials, mockSetLoading)(dispatch);

      // Assert
      expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
      expect(api.createThread).toHaveBeenCalledWith(fakeCredentials);
      expect(toast.error).toHaveBeenCalledWith(fakeError.message);
      expect(dispatch).not.toHaveBeenCalledWith(addThreadActionCreator(expect.anything()));
      expect(dispatch).not.toHaveBeenCalledWith(closeModal());
      expect(toast.success).not.toHaveBeenCalled();
      expect(mockSetLoading).toHaveBeenNthCalledWith(2, false);
    });
  });

  describe('asyncUpVoteThread', () => {
    it('should dispatch actions correctly on success', async () => {
      // arrange
      api.upVoteThread = vi.fn(() => Promise.resolve());
      const dispatch = vi.fn();
      const getState = vi.fn(() => ({
        threads: fakeThreadsState,
        threadDetail: fakeThreadDetailState,
      }));

      // action
      await asyncUpVoteThread('thread-1', 'user-1')(dispatch, getState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: 1 })
      );
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadDetailVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: 1 })
      );
      expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('should dispatch rollback actions and show toast error on failure', async () => {
      // Arrange
      api.upVoteThread = vi.fn(() => Promise.reject(fakeError));
      const dispatch = vi.fn();
      const getState = vi.fn(() => ({
        threads: fakeThreadsState,
        threadDetail: fakeThreadDetailState,
      }));

      // Action
      await asyncUpVoteThread('thread-1', 'user-1')(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: 1 })
      );
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadDetailVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: 1 })
      );
      expect(api.upVoteThread).toHaveBeenCalledWith('thread-1');
      expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsState.threads));
      expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetailState.threadDetail));
      expect(toast.error).toHaveBeenCalledWith(fakeError.message);
      expect(toast.success).not.toHaveBeenCalled();
    });
  });

  describe('asyncDownVoteThread', () => {
    it('should dispatch actions correctly on success', async () => {
      // Arrange
      api.downVoteThread = vi.fn(() => Promise.resolve());
      const dispatch = vi.fn();
      const getState = vi.fn(() => ({
        threads: fakeThreadsState,
        threadDetail: fakeThreadDetailState,
      }));

      // Action
      await asyncDownVoteThread('thread-1', 'user-1')(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: -1 })
      );
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadDetailVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: -1 })
      );
      expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('should dispatch rollback actions and show toast error on failure', async () => {
      // Arrange
      api.downVoteThread = vi.fn(() => Promise.reject(fakeError));
      const dispatch = vi.fn();
      const getState = vi.fn(() => ({
        threads: fakeThreadsState,
        threadDetail: fakeThreadDetailState,
      }));

      // Action
      await asyncDownVoteThread('thread-1', 'user-1')(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: -1 })
      );
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadDetailVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: -1 })
      );
      expect(api.downVoteThread).toHaveBeenCalledWith('thread-1');
      expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsState.threads));
      expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetailState.threadDetail));
      expect(toast.error).toHaveBeenCalledWith(fakeError.message);
      expect(toast.success).not.toHaveBeenCalled();
    });
  });

  describe('asyncNeutralVoteThread', () => {
    it('should dispatch actions correctly on success', async () => {
      // Arrange
      api.neutralVoteThread = vi.fn(() => Promise.resolve());
      const dispatch = vi.fn();
      const getState = vi.fn(() => ({
        threads: fakeThreadsState,
        threadDetail: fakeThreadDetailState,
      }));

      // Action
      await asyncNeutralVoteThread('thread-1', 'user-1')(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: 0 })
      );
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadDetailVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: 0 })
      );
      expect(api.neutralVoteThread).toHaveBeenCalledWith('thread-1');
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('should dispatch rollback actions and show toast error on failure', async () => {
      // Arrange
      api.neutralVoteThread = vi.fn(() => Promise.reject(fakeError));
      const dispatch = vi.fn();
      const getState = vi.fn(() => ({
        threads: fakeThreadsState,
        threadDetail: fakeThreadDetailState,
      }));

      // Action
      await asyncNeutralVoteThread('thread-1', 'user-1')(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: 0 })
      );
      expect(dispatch).toHaveBeenCalledWith(
        updateThreadDetailVoteActionCreator({ threadId: 'thread-1', userId: 'user-1', voteType: 0 })
      );
      expect(api.neutralVoteThread).toHaveBeenCalledWith('thread-1');
      expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsState.threads));
      expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetailState.threadDetail));
      expect(toast.error).toHaveBeenCalledWith(fakeError.message);
      expect(toast.success).not.toHaveBeenCalled();
    });
  });
});