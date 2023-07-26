import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowerEventService {


  async getTowerEvents() {
    // TODO Populate ticket count
    const events = await dbContext.TowerEvent.find().populate('ticketCount')
    return events
  }
  async getTowerEventsById(eventId) {
    // TODO Populate ticket count
    const event = await dbContext.TowerEvent.findById(eventId).populate('ticketCount')
    if (!event) {
      throw new BadRequest(`event with ${eventId} does not exist`)
    }
    return event
  }
  async createTowerEvent(eventData) {
    // TODO Populate ticket count
    const newEvent = (await (await dbContext.TowerEvent.create(eventData)).populate('creator', 'name picture')).populate('ticketCount')
    return newEvent
  }

  async updateTowerEventById(eventData, eventId) {
    const foundEvent = await this.getTowerEventsById(eventId)
    if (foundEvent.creatorId.toString() != eventData.creatorId) {
      throw new Forbidden('You can not edit events you do not own')
    }
    if (foundEvent.isCanceled == true) {
      throw new BadRequest('You can not edit a canceled event')
    }
    foundEvent.name = eventData.name || foundEvent.name
    foundEvent.description = eventData.description || foundEvent.description
    // foundEvent.isCanceled = eventData.isCanceled != null ? eventData.isCanceled : foundEvent.isCanceled

    await foundEvent.save()
    return foundEvent
  }
  async cancelTowerEventById(eventId, userId) {
    const foundEvent = await this.getTowerEventsById(eventId)
    if (foundEvent.creatorId.toString() != userId) {
      throw new Forbidden('You can not cancel events you do not own')
    }
    foundEvent.isCanceled = true
    await foundEvent.save()
    return foundEvent
  }

}
export const towerEventService = new TowerEventService()