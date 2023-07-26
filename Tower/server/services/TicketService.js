import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketService {

  async createTicket(ticketData) {
    const ticket = (await (await dbContext.Ticket.create(ticketData)).populate('profile', 'name picture'))
    await ticket.populate({
      path: 'event', populate: {
        path: 'ticketCount'
      }
    })
    return ticket
  }
  async getTicketsByAccountId(accountId) {
    const tickets = await dbContext.Ticket.find({ accountId }).populate('event')
    return tickets
  }
  async getTicketsByEventId(eventId) {
    const tickets = await dbContext.Ticket.find({ eventId }).populate('profile', 'name picture')
    return tickets
  }

  async removeTicketById(ticketId, accountId) {
    const ticket = await dbContext.Ticket.findById(ticketId)
    if (!ticket) {
      throw new BadRequest(`Ticket with ID${ticketId} does not exist`)
    }
    // FIXME added to sting here if things break check that
    if (ticket.accountId != accountId) {
      throw new Forbidden('You can not delete a ticket you do not own')
    }
    await ticket.populate({
      path: 'event', populate: {
        path: 'ticketCount'
      }
    })
    await ticket.remove()
    return `${ticket} has been removed`
  }

}
export const ticketService = new TicketService()