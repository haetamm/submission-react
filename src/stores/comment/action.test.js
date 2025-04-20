/**
 * Test Scenarios
 *
 * - asyncAddComment thunk
 *   - should dispatch actions and handle success correctly
 *   - should handle error correctly
 *
 * - asyncUpVoteComment thunk
 *   - should dispatch actions and handle success correctly
 *   - should handle error and revert state correctly
 *
 * - asyncDownVoteComment thunk
 *   - should dispatch actions and handle success correctly
 *   - should handle error and revert state correctly
 *
 * - asyncNeutralVoteComment thunk
 *   - should dispatch actions and handle success correctly
 *   - should handle error and revert state correctly
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import {
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralVoteComment,
  addCommentActionCreator,
  updateCommentVoteActionCreator,
  receiveCommentsActionCreator,
} from './action';

// Mock data
const createComment = (overrides = {}) => ({
  id: 'comment-1',
  content: 'ada',
  createdAt: '2025-03-11T09:44:28.387Z',
  owner: {
    id: 'user-1',
    name: 'Name 1',
    email: 'user1@gmail.com',
    avatar: 'https://ui-avatars.com/api/?name=Name1&background=random'
  },
  upVotesBy: [],
  downVotesBy: [],
  ...overrides
});

const fakeThreadId = 'thread-1';
const fakeCommentId = 'comment-1';
const fakeUserId = 'user-1';
const fakeComment = createComment();
const fakeComments = [
  createComment()
];
const fakeVoteResult = {
  commentId: 'comment-1',
  userId: 'user-1',
  voteType: 1, // atau -1, 0
};
const fakeError = new Error('Something went wrong');
const fakeCredentials = {
  content: 'Test comment',
};
const fakeId = 'thread-1';

// Mock
const mockSetLoading = vi.fn();
const mockReset = vi.fn();

describe('comment thunks', () => {
  beforeEach(() => {
    api._createComment = api.createComment;
    api._upVoteComment = api.upVoteComment;
    api._downVoteComment = api.downVoteComment;
    api._neutralVoteComment = api.neutralVoteComment;

    // Mock toast
    toast.success = vi.fn();
    toast.error = vi.fn();
  });

  afterEach(() => {
    api.createComment = api._createComment;
    api.upVoteComment = api._upVoteComment;
    api.downVoteComment = api._downVoteComment;
    api.neutralVoteComment = api._neutralVoteComment;

    delete api._createComment;
    delete api._upVoteComment;
    delete api._downVoteComment;
    delete api._neutralVoteComment;

    vi.resetAllMocks();
  });

  // Test asyncAddComment
  describe('asyncAddComment', () => {
    it('should dispatch actions and handle success correctly', async () => {
      // arrange
      api.createComment = () => Promise.resolve(fakeComment);
      const dispatch = vi.fn();

      // action
      await asyncAddComment({
        data: fakeCredentials,
        id: fakeId,
        setLoading: mockSetLoading,
        reset: mockReset,
      })(dispatch);

      // assert
      expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
      expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeComment));
      expect(toast.success).toHaveBeenCalledWith('balasan berhasil dikirim');
      expect(mockReset).toHaveBeenCalledWith({ content: '' });
      expect(mockSetLoading).toHaveBeenNthCalledWith(2, false);
    });

    it('should handle error correctly', async () => {
      // arrange
      api.createComment = () => Promise.reject(fakeError);
      const dispatch = vi.fn();

      // action
      await asyncAddComment({
        data: fakeCredentials,
        id: fakeId,
        setLoading: mockSetLoading,
        reset: mockReset,
      })(dispatch);

      // assert
      expect(mockSetLoading).toHaveBeenNthCalledWith(1, true);
      expect(dispatch).not.toHaveBeenCalled();
      expect(toast.error).toHaveBeenCalledWith(fakeError.message);
      expect(mockReset).not.toHaveBeenCalled();
      expect(mockSetLoading).toHaveBeenNthCalledWith(2, false);
    });
  });

  // Test asyncUpVoteComment
  describe('asyncUpVoteComment', () => {
    it('should dispatch actions and handle success correctly', async () => {
      // arrange
      api.upVoteComment = () => Promise.resolve(fakeVoteResult);
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({ comments: fakeComments });

      // action
      await asyncUpVoteComment(fakeThreadId, fakeCommentId, fakeUserId)(dispatch, getState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(
        updateCommentVoteActionCreator({
          commentId: fakeCommentId,
          userId: fakeUserId,
          voteType: 1,
        })
      );
      expect(dispatch).toHaveBeenCalledWith(updateCommentVoteActionCreator(fakeVoteResult));
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('should handle error and revert state correctly', async () => {
      // arrange
      api.upVoteComment = () => Promise.reject(fakeError);
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({ comments: fakeComments });

      // action
      await asyncUpVoteComment(fakeThreadId, fakeCommentId, fakeUserId)(dispatch, getState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(
        updateCommentVoteActionCreator({
          commentId: fakeCommentId,
          userId: fakeUserId,
          voteType: 1,
        })
      );
      expect(dispatch).toHaveBeenCalledWith(receiveCommentsActionCreator(fakeComments));
      expect(toast.error).toHaveBeenCalledWith(fakeError.message);
    });
  });

  // Test asyncDownVoteComment
  describe('asyncDownVoteComment', () => {
    it('should dispatch actions and handle success correctly', async () => {
      // arrange
      api.downVoteComment = () => Promise.resolve(fakeVoteResult);
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({ comments: fakeComments });

      // Act
      await asyncDownVoteComment(fakeThreadId, fakeCommentId, fakeUserId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        updateCommentVoteActionCreator({
          commentId: fakeCommentId,
          userId: fakeUserId,
          voteType: -1,
        })
      );
      expect(dispatch).toHaveBeenCalledWith(updateCommentVoteActionCreator(fakeVoteResult));
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('should handle error and revert state correctly', async () => {
      // Arrange
      api.downVoteComment = () => Promise.reject(fakeError);
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({ comments: fakeComments });

      // Act
      await asyncDownVoteComment(fakeThreadId, fakeCommentId, fakeUserId)(dispatch, getState);

      // Assert
      expect(dispatch).toHaveBeenCalledWith(
        updateCommentVoteActionCreator({
          commentId: fakeCommentId,
          userId: fakeUserId,
          voteType: -1,
        })
      );
      expect(dispatch).toHaveBeenCalledWith(receiveCommentsActionCreator(fakeComments));
      expect(toast.error).toHaveBeenCalledWith(fakeError.message);
    });
  });

  // Test asyncNeutralVoteComment
  describe('asyncNeutralVoteComment', () => {
    it('should dispatch actions and handle success correctly', async () => {
      // arrange
      api.neutralVoteComment = () => Promise.resolve(fakeVoteResult);
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({ comments: fakeComments });

      // action
      await asyncNeutralVoteComment(fakeThreadId, fakeCommentId, fakeUserId)(dispatch, getState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(
        updateCommentVoteActionCreator({
          commentId: fakeCommentId,
          userId: fakeUserId,
          voteType: 0,
        })
      );
      expect(dispatch).toHaveBeenCalledWith(updateCommentVoteActionCreator(fakeVoteResult));
      expect(toast.error).not.toHaveBeenCalled();
    });

    it('should handle error and revert state correctly', async () => {
      // arrange
      api.neutralVoteComment = () => Promise.reject(fakeError);
      const dispatch = vi.fn();
      const getState = vi.fn().mockReturnValue({ comments: fakeComments });

      // action
      await asyncNeutralVoteComment(fakeThreadId, fakeCommentId, fakeUserId)(dispatch, getState);

      // assert
      expect(dispatch).toHaveBeenCalledWith(
        updateCommentVoteActionCreator({
          commentId: fakeCommentId,
          userId: fakeUserId,
          voteType: 0,
        })
      );
      expect(dispatch).toHaveBeenCalledWith(receiveCommentsActionCreator(fakeComments));
      expect(toast.error).toHaveBeenCalledWith(fakeError.message);
    });
  });
});