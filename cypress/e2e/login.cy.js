/**
 * Test Scenarios
 *
 * - Login spec
 *   - should display validation errors when fields are empty
 *   - should display error for invalid email format
 *   - should display loading state during form submission
 *   - should display alert when username and password are wrong
 *   - should submit form successfully with valid data
 */

import { urlPage } from '../../src/utils/constans';
const BASE_URL = Cypress.env('API_BASE_URL');


Cypress.Commands.add('navigateToLogin', () => {
  cy.visit('http://localhost:5173/');
  cy.get('.sidebar > [data-testid="login-link"] > .button-label').click();
  cy.url().should('include', urlPage.LOGIN);
});

Cypress.Commands.add('fillLoginForm', ({ email, password } = {}) => {
  if (email) cy.get('[data-testid="email"]').type(email);
  if (password) cy.get('[data-testid="password"]').type(password);
});

Cypress.Commands.add('submitLoginForm', () => {
  cy.get('button').contains(/^Login$/).click();
});

Cypress.Commands.add('assertNoLoginValidationErrors', () => {
  cy.get('[data-testid="email-error"]').should('not.exist');
  cy.get('[data-testid="password-error"]').should('not.exist');
});

describe('Login spec', () => {
  beforeEach(() => {
    cy.navigateToLogin();
  });

  it('should displays validation errors when fields are empty', () => {
    cy.submitLoginForm();
    cy.get('[data-testid="email-error"]').should('contain.text', 'Invalid email address');
    cy.get('[data-testid="password-error"]').should('contain.text', 'Password is required');
  });

  it('should displays error for invalid email format', () => {
    cy.fillLoginForm({
      email: 'invalid-email',
      password: 'pass123',
    });
    cy.submitLoginForm();
    cy.get('[data-testid="email-error"]').should('contain.text', 'Invalid email address');
  });

  it('should displays loading state during form submission', () => {
    cy.intercept('POST', `${BASE_URL}/login`, (req) => {
      req.reply({
        delay: 1000,
        statusCode: 200,
        body: {
          token: 'valid-token',
        },
      });
    }).as('loginUser');

    cy.fillLoginForm({
      email: 'john@example.com',
      password: 'pass123',
    });
    cy.submitLoginForm();

    cy.get('button').should('contain.text', 'Loading').and('be.disabled');
    cy.wait('@loginUser');
    cy.get('button').should('contain.text', 'Login').and('not.be.disabled');
  });

  it('should displays alert when username and password are wrong', () => {
    cy.fillLoginForm({
      email: 'john@example.com',
      password: 'pass123',
    });
    cy.submitLoginForm();

    cy.get('.Toastify__toast--error').should('contain.text', 'email or password is wrong');
    cy.url().should('include', urlPage.LOGIN);
  });

  it('should submits form successfully with valid data', () => {
    cy.fillLoginForm({
      email: 'radja@gmail.com',
      password: '123456',
    });
    cy.submitLoginForm();

    cy.assertNoLoginValidationErrors();
    cy.url().should('include', urlPage.HOME);
    cy.get('.sidebar > [data-testid="login-link"]').should('not.exist');
  });
});