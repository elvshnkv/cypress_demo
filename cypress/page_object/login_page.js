
class LoginPage {

    get UserNameInputField(){
        return cy.get('#user-name').should('be.visible')
    }

    get UserPasswordInputField(){
        return cy.get('#password').should('be.visible')
    }

    get LoginButton(){
        return cy.get('#login-button').should('be.enabled')
    }

    loginUser(userName){
        this.UserNameInputField.type(userName)
        this.UserPasswordInputField.type(Cypress.env('USER_PASSWORD'))
        this.LoginButton.click()
    }

    isLoginPage(){
        cy.url().should('contain', 'v1')
    }

    open(){
        cy.visit('/v1/')
    }
}

export default new LoginPage()