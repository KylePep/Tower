import { useRouter } from "vue-router"
import { AppState } from "../AppState.js"
import { TowerEvents } from "../models/TowerEvents.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowerEventsService {
  async getTowerEvents() {
    const res = await api.get('api/events')
    logger.log('[EVENTS]', res.data)
    AppState.events = res.data.map(e => new TowerEvents(e))
  }

  async getTowerEventById(eventId) {
    const res = await api.get(`api/events/${eventId}`)
    logger.log('[EVENT BY ID]', res.data)
    AppState.activeEvent = new TowerEvents(res.data)
  }

  async createTowerEvent(eventData) {
    const res = await api.post('api/events', eventData)
    const event = new TowerEvents(res.data)
    AppState.events.push(event)
    AppState.activeEvent = event
    return event

  }
  async cancelEvent(eventId) {
    const res = await api.delete(`api/events/${eventId}`)
    logger.log('[Archived Event]', res.data)
    AppState.activeEvent.isCanceled = true
  }
}
export const towerEventsService = new TowerEventsService()