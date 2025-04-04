describe('Test Newsie App', () => {
  beforeEach(() => {
    // Ensure you're visiting the correct URL; update baseUrl in cypress.json if needed.
    cy.visit('/');
    cy.contains('It\'s all you need to know.');
  });

  it('should test home and about pages in app', () => {
    cy.visit('http://localhost:4200');
    cy.contains('It\'s all you need to know.');
    cy.contains('About').click();
    cy.contains('About Newsie');
    cy.url().should('eq', Cypress.config().baseUrl + '/about');
    cy.get('.brand-logo').click();
  });

  it('should test the newsstand page in app', () => {
    cy.contains('The Newsstand').click();
    cy.contains('The Newsstand');
    cy.url().should('eq', Cypress.config().baseUrl + '/newsstand');
    cy.get('input[placeholder="Search titles"]')
      .should('be.visible')
      .type('bite'); // replace 'Angular' with your search term
    cy.get('button.primary').click();
    cy.contains('Seriously Simple Bites').should('be.visible');
    cy.get('input[placeholder="Search titles"]')
      .should('be.visible')
      .clear(); // clear search term
    cy.get('button.primary').click();
    cy.contains('Daily World News').should('be.visible');
    cy.get('mat-chip-listbox')
      .contains('mat-chip-option', 'Lifestyle')
      .click()
      .should('have.class', 'mat-mdc-chip-selected');
    cy.contains('Seriously Simple Bites').should('be.visible');
    cy.get('.brand-logo').click();
  });

  it('should test the details page in app', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Learn More').click();
    cy.url().should('match', new RegExp('^' + Cypress.config().baseUrl + '/details/\\d+$'));
    cy.get('.back-link').click();
  });

  it('should test register, sign in, and forgot password pages in app', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Register').click();
    cy.contains('Register');
    cy.url().should('eq', Cypress.config().baseUrl + '/register');

    cy.contains('Sign In').click();
    cy.contains('Sign In');
    cy.url().should('eq', Cypress.config().baseUrl + '/login');

    cy.contains('Forgot password?').click();
    cy.contains('Email Password');
    cy.url().should('eq', Cypress.config().baseUrl + '/forgot-password');

    cy.contains('Cancel').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/login');

  });

});


