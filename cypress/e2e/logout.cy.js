/**
 * Test Scenarios
 *
 * - Logout spec
 *   - should open and close logout modal without logging out
 *   - should successfully log out
 */

Cypress.Commands.add('login', (email = 'radja@gmail.com', password = '123456') => {
  cy.visit('http://localhost:5173/guest/login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('button').contains(/^Login$/).click();
  cy.get('[data-testid="logout-button"]').should('exist');
});

Cypress.Commands.add('openLogoutModal', () => {
  cy.get('[data-testid="logout-button"]').click();
  cy.get('[data-testid="logout-toggle"]').click();
  cy.get('[data-testid="title-modal"]').should('contain.text', 'Logout');
});

Cypress.Commands.add('closeModal', () => {
  cy.get('[data-testid="close-modal"]').click();
  cy.get('[data-testid="title-modal"]').should('not.exist');
});

describe('Logout spec', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should opens and closes logout modal without logging out', () => {
    cy.openLogoutModal();
    cy.closeModal();
  });

  it('should successfully logs out', () => {
    cy.openLogoutModal();
    cy.get('button').contains(/^Logout$/).click();
    cy.get('[data-testid="title-modal"]').should('not.exist');
    cy.get('[data-testid="logout-button"]').should('not.exist');
  });
});