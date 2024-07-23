class InventoryPage {
    isInventoryPage() {
        cy.url().should('contain', 'inventory')
    }
}

export default new InventoryPage()
