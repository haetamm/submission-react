/**
 * Test Scenarios
 *
 * - Thread Like and Dislike Functionality spec
 *   - should increase like count when a user clicks the like button
 *   - should increase dislike count when a user clicks the dislike button
 *   - should remove like when a user clicks the like button again (neutral vote)
 *   - should switch from upvote to downvote when a user clicks the dislike button
 *   - should not allow an unauthenticated user to vote
 *   - should handle empty thread list correctly
 */

import { urlPage } from '../../src/utils/constans';

Cypress.Commands.add('login', (email = 'radja@gmail.com', password = '123456') => {
  cy.visit('http://localhost:5173/guest/login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('button').contains(/^Login$/).click();
  cy.url().should('include', urlPage.HOME);
});

Cypress.Commands.add('createThread', ({ title = `Test Thread ${Date.now()}`, category = 'test', body = 'This is a test thread' } = {}) => {
  cy.get('.sidebar > [data-testid="add-thread"] > .button-label').click();
  cy.get('[data-testid="title-modal"]').should('contain.text', 'Create Thread');
  cy.get('[data-testid="title"]').type(title);
  cy.get('[data-testid="category"]').type(category);
  cy.get('.ql-editor').type(body);
  cy.get('.button').contains(/^Create Thread$/).click();

  // Verify new thread
  cy.get('[data-testid="title-thread"]', { timeout: 2000 }).contains(title).should('be.visible');
  return cy.wrap(title); // Return title for use in tests
});

describe('Thread Like and Dislike Functionality', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should increase like count when a user clicks the like button', () => {
    // Create a new thread with unique title
    cy.createThread().then((title) => {
      // Find the new thread by title and verify initial state
      cy.get('[data-testid="title-thread"]').contains(title).parents('.thread-container').within(() => {
        cy.get('[data-testid="like"]').parent().find('p').invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(0);
        });
        cy.get('[data-testid="dislike"]').parent().find('p').invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(0);
        });
        cy.get('[data-testid="like"]').should('not.have.class', 'active');

        // Click the like button
        cy.get('[data-testid="like"]').click();

        // Verify UI after upvote
        cy.get('[data-testid="like"]').parent().find('p', { timeout: 10000 }).invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(1);
        });
        cy.get('[data-testid="like"]').should('have.class', 'active');
        cy.get('[data-testid="dislike"]').parent().find('p').invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(0);
        });
      });
    });
  });

  it('should increase dislike count when a user clicks the dislike button', () => {
    cy.createThread().then((title) => {
      // Find the new thread by title and verify initial state
      cy.get('[data-testid="title-thread"]').contains(title).parents('.thread-container').within(() => {
        cy.get('[data-testid="dislike"]').parent().find('p').invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(0);
        });
        cy.get('[data-testid="like"]').parent().find('p').invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(0);
        });
        cy.get('[data-testid="dislike"]').should('not.have.class', 'active');

        // Click the dislike button
        cy.get('[data-testid="dislike"]').click();

        // Verify UI after downvote
        cy.get('[data-testid="dislike"]').parent().find('p', { timeout: 10000 }).invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(1);
        });
        cy.get('[data-testid="dislike"]').should('have.class', 'active');
        cy.get('[data-testid="like"]').parent().find('p').invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(0);
        });
      });
    });
  });

  it('should remove like when a user clicks the like button again (neutral vote)', () => {
    // Create a new thread with unique title
    cy.createThread().then((title) => {
      // First, perform an upvote
      cy.get('[data-testid="title-thread"]').contains(title).parents('.thread-container').within(() => {
        cy.get('[data-testid="like"]').click();

        // Verify state after upvote
        cy.get('[data-testid="like"]').parent().find('p', { timeout: 10000 }).invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(1);
        });
        cy.get('[data-testid="like"]').should('have.class', 'active');

        // Click the like button again
        cy.get('[data-testid="like"]').click();

        // Verify UI after neutral vote
        cy.get('[data-testid="like"]').parent().find('p', { timeout: 10000 }).invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(0);
        });
        cy.get('[data-testid="like"]').should('not.have.class', 'active');
      });
    });
  });

  it('should switch from upvote to downvote when a user clicks the dislike button', () => {
    // Create a new thread with unique title
    cy.createThread().then((title) => {
      // First, perform an upvote
      cy.get('[data-testid="title-thread"]').contains(title).parents('.thread-container').within(() => {
        cy.get('[data-testid="like"]').click();

        // Verify state after upvote
        cy.get('[data-testid="like"]').parent().find('p', { timeout: 10000 }).invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(1);
        });
        cy.get('[data-testid="like"]').should('have.class', 'active');

        // Click the dislike button
        cy.get('[data-testid="dislike"]').click();

        // Verify UI after downvote
        cy.get('[data-testid="like"]').parent().find('p', { timeout: 10000 }).invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(0);
        });
        cy.get('[data-testid="like"]').should('not.have.class', 'active');
        cy.get('[data-testid="dislike"]').parent().find('p').invoke('text').then((text) => {
          expect(parseInt(text, 10)).to.equal(1);
        });
        cy.get('[data-testid="dislike"]').should('have.class', 'active');
      });
    });
  });

  it('should not allow an unauthenticated user to vote', () => {
    // Visit homepage without login
    cy.visit('http://localhost:5173/');
    cy.get('.thread-container', { timeout: 10000 }).should('have.length.at.least', 1);

    // Verify initial state for the first thread
    cy.get('[data-testid="like"]').eq(0).parent().find('p').invoke('text').then((text) => {
      const initialLikeCount = parseInt(text, 10);
      cy.get('[data-testid="dislike"]').eq(0).parent().find('p').invoke('text').then((dislikeText) => {
        const initialDislikeCount = parseInt(dislikeText, 10);

        // Click the like button
        cy.get('[data-testid="like"]').eq(0).click();

        // Verify no change
        cy.get('[data-testid="like"]').eq(0).parent().find('p').invoke('text').then((newText) => {
          expect(parseInt(newText, 10)).to.equal(initialLikeCount);
        });
        cy.get('[data-testid="like"]').eq(0).should('not.have.class', 'active');

        // Click the dislike button
        cy.get('[data-testid="dislike"]').eq(0).click();

        // Verify no change
        cy.get('[data-testid="dislike"]').eq(0).parent().find('p').invoke('text').then((newText) => {
          expect(parseInt(newText, 10)).to.equal(initialDislikeCount);
        });
        cy.get('[data-testid="dislike"]').eq(0).should('not.have.class', 'active');
      });
    });
  });

  it('should handle empty thread list correctly', () => {
    // Mock empty thread list
    cy.visit('http://localhost:5173/');
    cy.get('.thread-container', { timeout: 10000 }).should('not.exist');
    cy.get('[data-testid="like"]').should('not.exist');
    cy.get('[data-testid="dislike"]').should('not.exist');
  });

});