describe('sauce login test', () => {

  const password = 'secret_sauce'
  const locked_out_error = 'Epic sadface: Sorry, this user has been locked out.'

  it('login happy path', () => {
    cy.visit('/v1/')
    cy.url().should('contain','v1')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
    cy.url().should('contain','inventory')
  })

  it('Locked out user',() => {
    cy.visit('/v1/');
    cy.get('[data-test = "username"]').type('locked_out_user');
    cy.get('[data-test = "password"]').type(password)
    cy.get('#login-button').click()
    //cy.get('.svg-inline--fa fa-times-circle fa-w-16 fa-2x')
    cy.get('[data-icon = "times-circle"]')
    cy.get('[data-test = "error"]').contains(locked_out_error)
  })

  it.skip( 'Problem user', () =>{
    cy.visit('/v1/');
    cy.get('[data-test = "username"]').type('problem_user');
    cy.get('[data-test = "password"]').type(password)
    cy.get('#login-button').click()
    //cy.get('[class="inventory_list"]').find('.inventory_item_img').forEach(element=>{cy.log(element)})
    cy.request({
      url: '/v1/img/sauce-backpack-1200x1500.jpgWithGarbageOnItToBreakTheUrl',
      method: 'GET',
      failOnStatusCode: false
    }).then((resp) => {
      cy.log(resp)
      expect(resp.status).to.eq(404)
    })
  })

  it('performance glitch user',() =>{
    const t0 = performance.now()
    cy.visit('/v1/');
    cy.get('[data-test = "username"]').type('performance_glitch_user');
    cy.get('[data-test = "password"]').type(password)
    cy.get('#login-button').click()
    cy.get('.product_label')
    cy.wrap(performance.now()).then(t1 => {
      cy.log(`Page load took ${t1 - t0} milliseconds.`);
    })
  })

})