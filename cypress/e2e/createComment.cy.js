/**
 * Test Scenarios
 *
 * - Create Comment Thread spec
 *   - should display validation errors when fields are empty
 *   - should display loading state during form submission
 *   - should display alert when create comment failed
 *   - should create comment successfully
 */

import { urlPage } from '../../src/utils/constans';
const BASE_URL = Cypress.env('API_BASE_URL');


Cypress.Commands.add('login', (email = 'radja@gmail.com', password = '123456') => {
  cy.visit('http://localhost:5173/guest/login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('button').contains(/^Login$/).click();
  cy.url().should('include', urlPage.HOME);
});

Cypress.Commands.add('navigateToDetailThreadAndGetId', () => {
  return cy
    .get('[data-testid="title-thread"]')
    .eq(0)
    .then(($el) => {
      const href = $el.attr('href');
      const id = href.split('/').pop();
      cy.wrap($el).click();
      return cy.wrap(id);
    });
});

Cypress.Commands.add('submitCommentForm', () => {
  cy.get('.reply-button').contains(/^Reply$/).click();
});

Cypress.Commands.add('fillCommentForm', ({ content } = {}) => {
  if (content) cy.get('[data-testid="content"]').type(content);
});

Cypress.Commands.add('assertCommentDisplay', ({  content }) => {
  cy.get('[data-testid="body-comment"]').eq(0).should('contain.text', content);
});

describe('Create Comment Thread spec', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should display validation errors when fields are empty', () => {
    cy.navigateToDetailThreadAndGetId();
    cy.submitCommentForm();
    cy.get('[data-testid="content-error"]').should('contain.text', 'Content must be at least 1 characters');
  });

  it('should displays loading state during form submission', () => {
    cy.navigateToDetailThreadAndGetId().then((id) => {
      cy.intercept('POST', `${BASE_URL}/threads/${id}/comments`, {
        delay: 1000,
        statusCode: 500,
        body: { status: 'fail', message: 'Network Error' },
      }).as('createComment');

      cy.fillCommentForm({ content: 'Comment Thread' });
      cy.submitCommentForm();

      cy.get('.reply-button').should('contain.text', 'Loading').and('be.disabled');
      cy.wait('@createComment');
      cy.get('.reply-button').should('contain.text', 'Reply').and('not.be.disabled');
    });
  });

  it('should displays alert when create comment failed', () => {
    cy.navigateToDetailThreadAndGetId().then((id) => {
      cy.intercept('POST', `${BASE_URL}/threads/${id}/comments`, {
        delay: 1000,
        statusCode: 500,
        body: { status: 'fail', message: 'Network Error' },
      }).as('createComment');

      cy.fillCommentForm({ content: 'Comment Thread' });
      cy.submitCommentForm();

      cy.wait('@createComment');
      cy.get('.Toastify__toast--error').should('contain.text', 'Network Error');
    });
  });

  it('should create comment successfully', () => {
    cy.navigateToDetailThreadAndGetId();
    cy.fillCommentForm({
      content: 'Comment Thread Success',
    });
    cy.submitCommentForm();

    cy.get('[data-testid="content-error"]').should('not.exist');
    cy.get('.Toastify__toast--success').should('contain.text', 'balasan berhasil dikirim');

    cy.assertCommentDisplay({
      content: 'Comment Thread Success',
    });
  });
});