import { AppState } from "../AppState.js"
import { Attendee } from "../models/Attendee.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AttendeesService {

  async getTicketsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('[TICKETS]', res.data)
    AppState.attendees = res.data.map(d => new Attendee(d))
  }
  async createTicket(ticketData) {
    const res = await api.post('api/tickets', ticketData)
    logger.log('[CREATE TICKET]', res.data)
    AppState.activeEvent.ticketCount++
    AppState.attendees.push(new Attendee(res.data))
  }

  async getMyTickets() {
    if (!AppState.account.id) {
      return
    }
    logger.log(AppState.account.id)
    const res = await api.get('account/tickets')
    logger.log('[MyTickets]', res.data)
    AppState.myTickets = res.data.map(d => new Attendee(d))
  }
  async removeTicket(ticketId) {
    const res = await api.delete(`api/tickets/${ticketId}`)
    AppState.myTickets = AppState.myTickets.filter(tickets => tickets.id != ticketId)
  }
}
export const attendeesService = new AttendeesService()