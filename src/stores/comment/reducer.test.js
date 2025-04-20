/**
 * Test Scenarios
 *
 * - commentReducer function
 *   - should return the initial state when no action is provided
 *   - should return the initial state when given an unknown action
 *   - should return state with new comments when given RECEIVE_COMMENTS action
 *   - should add new comment to existing comments when given ADD_COMMENT action
 *   - should handle UPDATE_COMMENT_VOTE for upvote, downvote, neutral vote, and non-matching commentId
 */

import { describe, expect, it } from 'vitest';
import commentReducer from './reducer';
import { ActionType } from './action';
import { updateVotes } from '../../utils/helper';

// Helper function to create comment objects with defaults
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

describe('commentReducer function', () => {
  it('should return the initial state when no action is provided', () => {
    // action
    const state = commentReducer(undefined, {});
    // assert
    expect(state).toEqual([]);
  });

  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = [];
    // action
    const nextState = commentReducer(initialState, { type: 'UNKNOWN_ACTION' });
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return state with new comments when given RECEIVE_COMMENTS action', () => {
    // arrange
    const initialState = [];
    const comments = [
      createComment(),
      createComment({
        id: 'comment-2',
        content: 'ada 2',
        createdAt: '2026-03-11T09:44:28.387Z',
        owner: {
          id: 'user-2',
          name: 'Name 2',
          email: 'user2@gmail.com',
          avatar: 'https://ui-avatars.com/api/?name=Name2&background=random'
        },
        upVotesBy: [],
        downVotesBy: [],
      }),
    ];

    // action
    const nextState = commentReducer(initialState, {
      type: ActionType.RECEIVE_COMMENTS,
      payload: { comments },
    });

    // assert
    expect(nextState).toEqual(comments);
  });

  it('should add new comment to existing comments when given ADD_COMMENT action', () => {
    // arrange
    const initialComment = createComment();

    const newComment = createComment({
      id: 'comment-2',
      content: 'ada 2',
      createdAt: '2026-03-11T09:44:28.387Z',
      owner: {
        id: 'user-2',
        name: 'Name 2',
        email: 'user2@gmail.com',
        avatar: 'https://ui-avatars.com/api/?name=Name2&background=random'
      },
      upVotesBy: [],
      downVotesBy: [],
    });

    const initialState = [initialComment];

    // action
    const nextState = commentReducer(initialState, {
      type: ActionType.ADD_COMMENT,
      payload: { comment: newComment },
    });

    // assert
    expect(nextState).toEqual([newComment, initialComment]);
  });

  it('should handle UPDATE_COMMENT_VOTE for upvote, downvote, neutral vote, and non-matching commentId', () => {
    // arrange
    const comment = createComment();
    const initialState = [comment];
    const userId = 'user-2';
    const commentId = 'comment-1';

    //// Action: (Test upvote)
    const upVoteState = commentReducer(initialState, {
      type: ActionType.UPDATE_COMMENT_VOTE,
      payload: { commentId, userId, voteType: 1 },
    });
    const expectedUpvoteComment = updateVotes(comment, userId, 1);

    // assert
    expect(upVoteState).toEqual([expectedUpvoteComment]);


    //// Action: (Test downvote)
    const downVoteState = commentReducer(upVoteState, {
      type: ActionType.UPDATE_COMMENT_VOTE,
      payload: { commentId, userId, voteType: -1 },
    });

    const expectedDownvoteComment = updateVotes(expectedUpvoteComment, userId, -1);

    // assert
    expect(downVoteState).toEqual([expectedDownvoteComment]);


    //// Action: Test neutralvote
    const neutralVote = commentReducer(upVoteState, {
      type: ActionType.UPDATE_COMMENT_VOTE,
      payload: { commentId, userId, voteType: 0 },
    });
    const expectedNeutralvoteComment = updateVotes(expectedUpvoteComment, userId, 0);

    // assert
    expect(neutralVote).toEqual([expectedNeutralvoteComment]);


    //// Arrange (Test Non-matching threadId)
    const wrongCommentIdAction = {
      type: ActionType.UPDATE_COMMENT_VOTE,
      payload: { commentId: 'wrong-comment', userId, voteType: 1 },
    };
    // action
    const wrongCommentIdState = commentReducer(initialState, wrongCommentIdAction);

    // Assert
    expect(wrongCommentIdState).toEqual(initialState);
  });

});