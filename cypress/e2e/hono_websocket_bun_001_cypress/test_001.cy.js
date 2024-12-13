/// <reference types="cypress" />

//TODO: new webpack import features with WebSocketHelper
import { WebSocketHelper } from '../../support/websocket-helper'
//
describe('Hono WebSocket Bun Dev Server Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should load the application successfully', () => {
        cy.get('h1').should('exist')
        cy.url().should('include', 'localhost:3000')
    })

    it('should establish WebSocket connection', () => {
        cy.window().then((win) => {
            const ws = new WebSocket('ws://localhost:3000/ws')

            ws.onopen = () => {
                expect(ws.readyState).to.equal(1)
            }
        })
    })

    it('should send and receive WebSocket messages', () => {
        // mesaj test 'Hello Server!' , ar trebui prelucrat in codul sursa
        cy.window().then((win) => {
            const ws = new WebSocket('ws://localhost:3000/ws')

            ws.onopen = () => {
                ws.send('Hello Server!')
            }

            ws.onmessage = (event) => {
                expect(event.data).to.exist
            }
        })
    })

})

describe('Order Status WebSocket Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should display the initial page structure', () => {
        cy.get('h1')
            .should('exist')
            .and('have.text', 'Order Status:')
            .and('have.css', 'color', 'rgb(255, 255, 255)')

        cy.get('body')
            .should('have.css', 'background', 'rgb(0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box')
    })

    it('should have HTMX and WebSocket extensions loaded', () => {
        cy.window().then((win) => {
            expect(win.htmx).to.exist
            cy.get('[hx-ext="ws"]').should('exist')
            cy.get('[ws-connect="/order/1/status"]').should('exist')
        })
    })

    it('should receive and display order updates', () => {
        cy.get('#orderUpdate')
            .should('exist')

        cy.contains('Order Updated', { timeout: 10000 }).should('exist')

        cy.get('#orderUpdate')
            .children()
            .should('have.length.gt', 0)
    })

    it('should maintain WebSocket connection', () => {
        cy.get('[ws-connect="/order/1/status"]')
            .should('exist')
            .then(() => {
                cy.wait(5000)
                cy.contains('Order Updated').should('exist')
            })
    })
})

describe('Order Status Update Timing Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('should verify timing between order updates', () => {
        let updateTimes = []

        // Function to capture update time
        const captureUpdate = () => {
            cy.get('#orderUpdate')
                .children()
                .its('length')
                .then(length => {
                    updateTimes.push({
                        time: Date.now(),
                        count: length
                    })
                })
        }

        // Initial capture
        captureUpdate()

        // Wait and capture again
        cy.wait(3000)
        captureUpdate()

        // Verify updates
        cy.wrap(null).then(() => {
            const timeDifference = updateTimes[1].time - updateTimes[0].time
            const messagesDifference = updateTimes[1].count - updateTimes[0].count

            cy.log(`Time elapsed: ${timeDifference}ms`)
            cy.log(`New messages: ${messagesDifference}`)

            // Verify we received new messages
            expect(messagesDifference).to.be.gt(0)
        })
    })

    it('should track multiple consecutive updates', () => {
        const updateTimes = []

        // Track 3 consecutive updates
        for(let i = 0; i < 3; i++) {
            cy.contains('Order Updated', { timeout: 10000 })
                .should('exist')
                .then(() => {
                    updateTimes.push(Date.now())
                    if (i > 0) {
                        const interval = updateTimes[i] - updateTimes[i-1]
                        cy.log(`Update interval ${i}: ${interval}ms`)
                    }
                })
        }
    })
})
//TODO: new webpack test features with WebSocketHelper
describe('Hono WebSocket Tests', () => {
    const wsHelper = new WebSocketHelper('ws://localhost:3000/ws')

    beforeEach(() => {
        cy.visit('http://localhost:3000')
        wsHelper.connect()
    })

    afterEach(() => {
        wsHelper.disconnect()
    })

    // Your existing tests with enhanced structure
    it('should load the application successfully', () => {
        cy.get('h1').should('exist')
        cy.url().should('include', 'localhost:3000')
    })
})
// not working in strict mode
// interface OrderUpdate {
//     status: string;
//     timestamp: string;
// }

// use let to :
// Block scoping makes code safer
// Prevents variable hoisting issues
// Follows current JavaScript best practices

let OrderUpdate;
OrderUpdate = {
    status: String,
    timestamp: String
}

describe('Hono WebSocket Bun Dev Server Tests', () => {
    // not working , uses standard JavaScript syntax
    //let wsConnection: WebSocket;
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('validates message format and timing', () => {
        let messageCount = 0
        const startTime = Date.now()

        cy.window().then((win) => {
            const ws = new WebSocket('ws://localhost:3000/order/1/status')

            ws.onmessage = (event) => {
                messageCount++
                // Handle HTML message format
                const message = event.data
                expect(message).to.include('orderUpdate')
                expect(message).to.include('Order Updated')

                // Check message timing
                if (messageCount === 3) {
                    const elapsed = Date.now() - startTime
                    expect(elapsed).to.be.closeTo(6000, 500)
                }
            }
        })

        cy.wait(6500)
    })

    it('should load the application successfully', () => {
        cy.get('h1').should('exist')
        cy.url().should('include', 'localhost:3000')
    })
    it('should display the initial page structure', () => {
        cy.get('h1')
            .should('exist')
            .and('have.text', 'Order Status:')
            .and('have.css', 'color', 'rgb(255, 255, 255)')
    })
    it('should have HTMX and WebSocket extensions loaded', () => {
        cy.window().then((win) => {
            expect(win.htmx).to.exist
            cy.get('[hx-ext="ws"]').should('exist')
            cy.get('[ws-connect="/order/1/status"]').should('exist')
        })
    })
    it('should receive and display order updates', () => {
        cy.get('#orderUpdate')
            .should('exist')
    })
})