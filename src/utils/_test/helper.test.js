/**
 * Test Scenarios
 *
 * - showFormattedDate function
 *   - should format date correctly in Indonesian locale
 *   - should handle invalid date and return 'Invalid Date'
 *
 * - isActive function
 *   - should return true if prefixes match
 *   - should return false if prefixes do not match
 *
 * - stripHtml function
 *   - should remove HTML tags and trim whitespace
 *   - should return empty string for input containing only HTML tags
 *
 * - transformThreadsWithOwners function
 *   - should transform threads with owner data, using default owner for unmatched ownerId
 *
 * - filterThreadByTitle function
 *   - should filter threads by title with case-insensitive matching
 *   - should return empty array if no threads match the title query
 *
 * - filterThreadByCategory function
 *   - should filter threads by exact category match
 *   - should return empty array if no threads match the category
 *
 * - handleTextareaChange function
 *   - should adjust textarea height based on scrollHeight
 *   - should cap textarea height at 300px if scrollHeight exceeds 300px
 *
 * - updateVotes function
 *   - should add upvote to upVotesBy array
 *   - should add downvote to downVotesBy array
 *   - should add downvote and remove existing upvote for the same user
 *   - should add upvote and remove existing downvote for the same user
 *   - should remove both upvote and downvote for neutral vote
 *   - should handle missing vote arrays and initialize them
 *   - should handle null vote arrays and initialize them
 */

import { describe, it, expect, vi } from 'vitest';
import {
  showFormattedDate,
  isActive,
  stripHtml,
  transformThreadsWithOwners,
  handleTextareaChange,
  filterThreadByTitle,
  updateVotes,
  filterThreadByCategory,
} from '../helper';

// Mock DOM untuk handleTextareaChange
const mockTextarea = {
  style: { height: '' },
  scrollHeight: 150,
};
vi.stubGlobal('document', {
  querySelector: () => mockTextarea,
});

describe('Helper Functions', () => {
  describe('showFormattedDate', () => {
    it('should format date correctly in Indonesian locale', () => {
      const date = '2023-05-29T07:55:52.266Z';
      const result = showFormattedDate(date);
      expect(result).toBe('Monday, May 29, 2023');
    });

    it('should handle invalid date', () => {
      const result = showFormattedDate('invalid-date');
      expect(result).toBe('Invalid Date');
    });
  });

  describe('isActive', () => {
    it('should return true if prefixes match', () => {
      expect(isActive('/home', '/home')).toBe(true);
    });

    it('should return false if prefixes do not match', () => {
      expect(isActive('/home', '/about')).toBe(false);
    });
  });

  describe('stripHtml', () => {
    it('should remove HTML tags and trim', () => {
      const html = '<p>Hello <b>World</b></p> ';
      expect(stripHtml(html)).toBe('Hello World');
    });

    it('should return empty string for only tags', () => {
      expect(stripHtml('<div></div>')).toBe('');
    });
  });

  describe('transformThreadsWithOwners', () => {
    // arrange
    const threads = [{ id: 't1', ownerId: 'u1' }, { id: 't2', ownerId: 'u2' }];
    const users = [
      { id: 'u1', name: 'Alice', avatar: 'alice.jpg' },
      { id: 'u3', name: 'Bob', avatar: 'bob.jpg' },
    ];

    it('should transform threads with owner data', () => {
      // action
      const result = transformThreadsWithOwners(threads, users);
      // assert
      expect(result).toEqual([
        {
          id: 't1',
          ownerId: 'u1',
          owner: { id: 'u1', name: 'Alice', avatar: 'alice.jpg' },
        },
        {
          id: 't2',
          ownerId: 'u2',
          owner: {
            id: 'u2',
            name: 'Unknown',
            avatar: 'https://ui-avatars.com/api/?name=Unknown',
          },
        },
      ]);
    });
  });

  describe('filterThreadByTitle', () => {
    // arrange
    const threads = [
      { title: 'Hello World' },
      { title: 'Test Case' },
      { title: 'hello again' },
    ];

    it('should filter threads by title (case insensitive)', () => {
      //action
      const result = filterThreadByTitle(threads, 'hello');
      // assert
      expect(result).toEqual([
        { title: 'Hello World' },
        { title: 'hello again' },
      ]);
    });

    it('should return empty array if no match', () => {
      // action & assert
      expect(filterThreadByTitle(threads, 'xyz')).toEqual([]);
    });
  });

  describe('filterThreadByCategory', () => {
    // arrange
    const threads = [
      { category: 'tech' },
      { category: 'tech' },
      { category: 'news' },
    ];

    it('should filter threads by exact category match', () => {
      // action
      const result = filterThreadByCategory(threads, 'tech');
      // assert
      expect(result).toEqual([{ category: 'tech' }, { category: 'tech' }]);
    });

    it('should return empty array if no match', () => {
      const result = filterThreadByCategory(threads, 'sports');
      expect(result).toEqual([]);
    });
  });

  describe('handleTextareaChange', () => {
    it('should adjust textarea height based on scrollHeight', () => {
      // arrange
      const event = { target: mockTextarea };
      // action
      handleTextareaChange(event);
      // assert
      expect(mockTextarea.style.height).toBe('150px');
    });

    it('should cap height at 300px', () => {
      // arrange
      mockTextarea.scrollHeight = 350;
      const event = { target: mockTextarea };
      // action
      handleTextareaChange(event);
      // assert
      expect(mockTextarea.style.height).toBe('300px');
    });
  });

  describe('updateVotes', () => {
    // arrange
    const thread = {
      upVotesBy: ['u1'],
      downVotesBy: ['u2',],
    };

    it('should add upvote', () => {
      const result = updateVotes(thread, 'u3', 1);
      expect(result).toEqual({
        upVotesBy: ['u1', 'u3'],
        downVotesBy: ['u2'],
      });
    });

    it('should add downVote', () => {
      const result = updateVotes(thread, 'u3', -1);
      expect(result).toEqual({
        upVotesBy: ['u1'],
        downVotesBy: ['u2', 'u3'],
      });
    });

    it('should add downVote and remove upVote', () => {
      const result = updateVotes(thread, 'u1', -1);
      expect(result).toEqual({
        upVotesBy: [],
        downVotesBy: ['u2', 'u1'],
      });
    });

    it('should add upVote and remove downVote', () => {
      const result = updateVotes(thread, 'u2', 1);
      expect(result).toEqual({
        upVotesBy: ['u1', 'u2'],
        downVotesBy: [],
      });
    });

    it('should remove both votes for neutral vote', () => {
      const result = updateVotes(thread, 'u1', 0);
      expect(result).toEqual({
        upVotesBy: [],
        downVotesBy: ['u2'],
      });
    });

    it('should handle missing vote arrays', () => {
      const threadWithoutVotes = {};
      const result = updateVotes(threadWithoutVotes, 'u1', 1);
      expect(result).toEqual({
        upVotesBy: ['u1'],
        downVotesBy: [],
      });
    });

    it('should handle null vote arrays', () => {
      const threadWithNullVotes = { upVotesBy: null, downVotesBy: null };
      const result = updateVotes(threadWithNullVotes, 'u1', 1);
      expect(result).toEqual({
        upVotesBy: ['u1'],
        downVotesBy: [],
      });
    });
  });

});