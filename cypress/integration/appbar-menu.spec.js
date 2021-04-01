it('navigate around the website', () => {
  cy.visit('http://localhost:3000');

  cy.get('[data-cy="appbar-menu-/"]').contains('Zakoupit známku').click();
  cy.location('pathname').should('match', /\//)
  cy.get('main');
  
  cy.get('[data-cy="appbar-menu-/prehled"]').contains('Moje známky').click();
  cy.location('pathname').should('match', /\/login$/)
  cy.get('main');

  cy.get('[data-cy="appbar-menu-cart"]').click();
  cy.location('pathname').should('match', /\/kosik$/)
  cy.get('main');

});