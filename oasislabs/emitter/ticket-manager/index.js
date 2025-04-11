const TicketManager = require('./ticket-manager')
const EmailService = require('./email-service')
const DatabaseService = require('./database-service')

const ticketManager = new TicketManager(3)
const emailService = new EmailService()
const databaseService = new DatabaseService()


ticketManager.on('buy', (email, price, timestamp) => {
  emailService.send(email)
  databaseService.save(email, price, timestamp)
})

ticketManager.on('error', (error) => {
  console.error(`Gracefully handling our error: ${error}`)
})

ticketManager.buy('test@email.com', 20)

// ticketManager.removeAllListeners('buy')
// ticketManager.buy('test@email.com', 30)