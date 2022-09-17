
describe('visit.cy.js', () => {
    it('Does not match!', () => {
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid="add-scheme"]')
            .click()
            .wait(3000)
            .get('[data-testid="scheme-name"]')
            .type("My First Scheme")
            .get('[data-testid="create-scheme"]')
            .click()
            .wait(6000)
    })
})
