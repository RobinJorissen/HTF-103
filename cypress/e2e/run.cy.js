  it('passes', () => {
    cy.visit('https://hackthefuture.bignited.be/')
    cy.get('p').click();
    cy.wait(25000)
    cy.get('#male').click();
      })
})
