/**
 * Test Scenarios
 *
 * - Register spec
 *   - should display validation errors when fields are empty
 *   - should display error for invalid email format
 *   - should display error for password less than 6 characters
 *   - should display error for password with non-alphanumeric characters
 *   - should display error when passwords do not match
 *   - should display alert error when email is already taken
 *   - should submit form successfully with valid data
 *   - should display loading state during form submission
 */

import { urlPage } from '../../src/utils/constans';
const BASE_URL = Cypress.env('API_BASE_URL');


Cypress.Commands.add('navigateToRegister', () => {
  cy.visit('http://localhost:5173/');
  cy.get('.sidebar > [data-testid="login-link"] > .button-label').click();
  cy.url().should('include', urlPage.LOGIN);
  cy.get('[data-testid="register-link"]').click();
  cy.url().should('include', urlPage.REGISTER);
});

Cypress.Commands.add('fillRegisterForm', ({ name, email, password, passwordConfirmation } = {}) => {
  if (name) cy.get('[data-testid="name"]').type(name);
  if (email) cy.get('[data-testid="email"]').type(email);
  if (password) cy.get('[data-testid="password"]').type(password);
  if (passwordConfirmation) cy.get('[data-testid="passwordConfirmation"]').type(passwordConfirmation);
});

Cypress.Commands.add('submitRegisterForm', () => {
  cy.get('.create-account').contains(/^Create Account$/).click();
});

Cypress.Commands.add('assertNoValidationErrors', () => {
  cy.get('[data-testid="name-error"]').should('not.exist');
  cy.get('[data-testid="email-error"]').should('not.exist');
  cy.get('[data-testid="password-error"]').should('not.exist');
  cy.get('[data-testid="passwordConfirmation-error"]').should('not.exist');
});

describe('Register spec', () => {
  beforeEach(() => {
    cy.navigateToRegister();
  });

  it('should displays validation errors when fields are empty', () => {
    cy.submitRegisterForm();
    cy.get('[data-testid="name-error"]').should('contain.text', 'Name must be at least 1 characters long');
    cy.get('[data-testid="email-error"]').should('contain.text', 'Invalid email address');
    cy.get('[data-testid="password-error"]').should('contain.text', 'Minimum 6 characters');
  });

  it('should displays error for invalid email format', () => {
    cy.fillRegisterForm({
      name: 'John',
      email: 'invalid-email',
      password: 'pass123',
      passwordConfirmation: 'pass123',
    });
    cy.submitRegisterForm();
    cy.get('[data-testid="email-error"]').should('contain.text', 'Invalid email address');
  });

  it('should displays error for password less than 6 characters', () => {
    cy.fillRegisterForm({
      name: 'John',
      email: 'john@example.com',
      password: 'pass',
      passwordConfirmation: 'pass',
    });
    cy.submitRegisterForm();
    cy.get('[data-testid="password-error"]').should('contain.text', 'Minimum 6 characters');
  });

  it('should displays error for password with non-alphanumeric characters', () => {
    cy.fillRegisterForm({
      name: 'John',
      email: 'john@example.com',
      password: 'pass@123',
      passwordConfirmation: 'pass@123',
    });
    cy.submitRegisterForm();
    cy.get('[data-testid="password-error"]').should('contain.text', 'Password must contain only alphanumeric characters');
  });

  it('should displays error when passwords do not match', () => {
    cy.fillRegisterForm({
      name: 'John',
      email: 'john@example.com',
      password: 'pass123',
      passwordConfirmation: 'pass124',
    });
    cy.submitRegisterForm();
    cy.get('[data-testid="passwordConfirmation-error"]').should('contain.text', 'Passwords do not match');
  });

  it('should displays alert error when email is already taken', () => {
    cy.intercept('POST', `${BASE_URL}/register`, {
      statusCode: 500,
      body: {
        status: 'fail',
        message: 'email is already taken',
      },
    }).as('registerUser');

    cy.fillRegisterForm({
      name: 'John',
      email: 'john@example.com',
      password: 'pass123',
      passwordConfirmation: 'pass123',
    });
    cy.submitRegisterForm();

    cy.wait('@registerUser');
    cy.get('.Toastify__toast--error').should('contain.text', 'email is already taken');
    cy.url().should('include', urlPage.REGISTER);
  });

  it('should submits form successfully with valid data', () => {
    cy.intercept('POST', `${BASE_URL}/register`, {
      statusCode: 200,
      body: {
        status: 'success',
        message: 'User registered successfully',
        data: { user: { name: 'John', email: 'john@example.com' } },
      },
    }).as('registerUser');

    cy.fillRegisterForm({
      name: 'John',
      email: 'john@example.com',
      password: 'pass123',
      passwordConfirmation: 'pass123',
    });
    cy.submitRegisterForm();

    cy.assertNoValidationErrors();

    cy.wait('@registerUser').its('request.body').should('deep.equal', {
      name: 'John',
      email: 'john@example.com',
      password: 'pass123',
    });

    cy.url().should('include', urlPage.LOGIN);
    cy.get('.Toastify__toast--success').should('contain.text', 'selamat John, silahkan login');
  });

  it('should displays loading state during form submission', () => {
    cy.intercept('POST', `${BASE_URL}/register`, {
      statusCode: 500,
      body: {
        status: 'fail',
        message: 'email is already taken',
      },
    }).as('registerUser');

    cy.fillRegisterForm({
      name: 'John',
      email: 'john@example.com',
      password: 'pass123',
      passwordConfirmation: 'pass123',
    });
    cy.submitRegisterForm();

    cy.get('.create-account').should('contain.text', 'Loading').and('be.disabled');
    cy.wait('@registerUser');
    cy.get('.create-account').should('contain.text', 'Create Account').and('not.be.disabled');
  });
});