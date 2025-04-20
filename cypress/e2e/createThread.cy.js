/**
 * Test Scenarios
 *
 * - Create Thread spec
 *   - should open and close create thread modal
 *   - should display validation errors when fields are empty
 *   - should display validation errors for title and body with only spaces
 *   - should display validation error for empty body with valid title
 *   - should display validation error for empty title with valid body
 *   - should display loading state during form submission
 *   - should display alert when create thread fails
 *   - should submit form successfully with valid data and optional category
 *   - should submit form successfully with empty category
 */

const BASE_URL = Cypress.env('API_BASE_URL');

Cypress.Commands.add('login', (email = 'radja@gmail.com', password = '123456') => {
  cy.visit('http://localhost:5173/guest/login');
  cy.get('[data-testid="email"]').type(email);
  cy.get('[data-testid="password"]').type(password);
  cy.get('button').contains(/^Login$/).click();
});

Cypress.Commands.add('openCreateThreadModal', () => {
  cy.get('.sidebar > [data-testid="add-thread"] > .button-label').click();
  cy.get('[data-testid="title-modal"]').should('contain.text', 'Create Thread');
});

Cypress.Commands.add('fillThreadForm', ({ title, category, body } = {}) => {
  if (title) cy.get('[data-testid="title"]').type(title);
  if (category) cy.get('[data-testid="category"]').type(category);
  if (body) cy.get('.ql-editor').type(body);
});

Cypress.Commands.add('submitThreadForm', () => {
  cy.get('.button').contains(/^Create Thread$/).click();
});

Cypress.Commands.add('assertThreadDisplay', ({ title, body, category = 'general', owner = 'radja test' }) => {
  cy.get('[data-testid="owner-name"]').eq(0).should('contain.text', owner);
  cy.get('[data-testid="title-thread"]').eq(0).should('contain.text', title);
  cy.get('[data-testid="body-thread"]').eq(0).should('contain.text', body);
  cy.get('[data-testid="category-thread"]').eq(0).should('contain.text', category);
  cy.get('[data-testid="avatar"]').should('be.visible').and(
    'have.attr',
    'src',
    'https://ui-avatars.com/api/?name=radja test&background=random'
  );
});

describe('Create Thread spec', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should opens and closes create thread modal', () => {
    cy.openCreateThreadModal();
    cy.get('[data-testid="close-modal"]').click();
    cy.get('[data-testid="title-modal"]').should('not.exist');
  });

  it('should displays validation errors when fields are empty', () => {
    cy.openCreateThreadModal();
    cy.submitThreadForm();
    cy.get('[data-testid="title-error"]').should('contain.text', 'Title must be at least 1 characters long');
    cy.get('[data-testid="body-error"]').should('contain.text', 'cannot be empty or just whitespace');
    cy.get('[data-testid="category-error"]').should('not.exist');
  });

  it('should displays validation errors for title and body with only spaces', () => {
    cy.openCreateThreadModal();
    cy.fillThreadForm({ title: '   ', body: '   ' });
    cy.submitThreadForm();
    cy.get('[data-testid="title-error"]').should('contain.text', 'Title must be at least 1 characters long');
    cy.get('[data-testid="body-error"]').should('contain.text', 'cannot be empty or just whitespace');
    cy.get('[data-testid="category-error"]').should('not.exist');
  });

  it('should displays validation error for empty body with valid title', () => {
    cy.openCreateThreadModal();
    cy.fillThreadForm({ title: 'Valid Title' });
    cy.submitThreadForm();
    cy.get('[data-testid="title-error"]').should('not.exist');
    cy.get('[data-testid="body-error"]').should('contain.text', 'cannot be empty or just whitespace');
    cy.get('[data-testid="category-error"]').should('not.exist');
  });

  it('should displays validation error for empty title with valid body', () => {
    cy.openCreateThreadModal();
    cy.fillThreadForm({ body: 'Valid Body Content' });
    cy.submitThreadForm();
    cy.get('[data-testid="title-error"]').should('contain.text', 'Title must be at least 1 characters long');
    cy.get('[data-testid="body-error"]').should('not.exist');
    cy.get('[data-testid="category-error"]').should('not.exist');
  });

  it('should displays loading state during form submission', () => {
    cy.intercept('POST', `${BASE_URL}/threads`, {
      delay: 1000,
      statusCode: 500,
      body: { status: 'fail', message: 'Network Error' },
    }).as('createThread');

    cy.openCreateThreadModal();
    cy.fillThreadForm({
      title: 'Thread title test e2e',
      category: 'loading test',
      body: 'Thread body test e2e',
    });
    cy.submitThreadForm();

    cy.get('.button').should('contain.text', 'Loading').and('be.disabled');
    cy.wait('@createThread');
    cy.get('.button').should('contain.text', 'Create Thread').and('not.be.disabled');
  });

  it('should displays alert when create thread fails', () => {
    cy.intercept('POST', `${BASE_URL}/threads`, {
      delay: 1000,
      statusCode: 500,
      body: { status: 'fail', message: 'Network Error' },
    }).as('createThread');

    cy.openCreateThreadModal();
    cy.fillThreadForm({
      title: 'Thread title test e2e',
      category: 'loading test',
      body: 'Thread body test e2e',
    });
    cy.submitThreadForm();

    cy.wait('@createThread');
    cy.get('.Toastify__toast--error').should('contain.text', 'Network Error');
    cy.get('form').should('be.visible');
  });

  it('should submits form successfully with valid data and optional category', () => {
    cy.openCreateThreadModal();
    cy.fillThreadForm({
      title: 'Thread title test e2e',
      category: 'general test e2e',
      body: 'Thread body test e2e',
    });
    cy.submitThreadForm();

    cy.get('[data-testid="title-error"]').should('not.exist');
    cy.get('[data-testid="body-error"]').should('not.exist');
    cy.get('[data-testid="category-error"]').should('not.exist');
    cy.get('.Toastify__toast--success').should('contain.text', 'Thread berhasil dikirim');
    cy.get('[data-testid="title-modal"]').should('not.exist');

    cy.assertThreadDisplay({
      title: 'Thread title test e2e',
      body: 'Thread body test e2e',
      category: 'general test e2e',
    });
  });

  it('should submits form successfully with empty category', () => {
    cy.openCreateThreadModal();
    cy.fillThreadForm({
      title: 'Thread title test e2e',
      body: 'Thread body test e2e',
    });
    cy.submitThreadForm();

    cy.get('[data-testid="title-error"]').should('not.exist');
    cy.get('[data-testid="body-error"]').should('not.exist');
    cy.get('[data-testid="category-error"]').should('not.exist');
    cy.get('.Toastify__toast--success').should('contain.text', 'Thread berhasil dikirim');
    cy.get('[data-testid="title-modal"]').should('not.exist');

    cy.assertThreadDisplay({
      title: 'Thread title test e2e',
      body: 'Thread body test e2e',
    });
  });
});