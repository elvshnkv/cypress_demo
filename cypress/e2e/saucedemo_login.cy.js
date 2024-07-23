import UserData from '../fixtures/users.json'
import LoginPage from "../page_object/login_page.js";
import InventoryPage from "../page_object/inventory_page.js";

describe('sauce login test', () => {

    const STANDARD_USER = UserData.standard_user.name,
        LOCKED_OUT_USER = UserData.locked_out_user.name,
        PROBLEM_USER = UserData.problem_user.name,
        PERFORMANCE_GLITCH_USER = UserData.performance_glitch_user.name

    const locked_out_error = 'Epic sadface: Sorry, this user has been locked out.'

    beforeEach(()=>{
        LoginPage.open()
        LoginPage.isLoginPage()
        //LoginPage.loginUser(STANDARD_USER)
    })

    it('login happy path', () => {
        cy.log('when user logins')
        LoginPage.loginUser(STANDARD_USER)
        cy.log('then inventory page is opened')
        InventoryPage.isInventoryPage()
    })

    it('Locked out user', () => {
        LoginPage.loginUser(LOCKED_OUT_USER)
        cy.get('[data-icon = "times-circle"]')
        cy.get('[data-test = "error"]').contains(locked_out_error)
    })

    it('Problem user', () => {
        LoginPage.loginUser(PROBLEM_USER)
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

    it('performance glitch user', () => {
        const t0 = performance.now()
        LoginPage.loginUser(PERFORMANCE_GLITCH_USER)
        cy.get('.product_label')
        cy.wrap(performance.now()).then(t1 => {
            cy.log(`Page load took ${t1 - t0} milliseconds.`);
        })
    })

})