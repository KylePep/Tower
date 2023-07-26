import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEventService.js";
import { ticketService } from "../services/TicketService.js";
import { commentService } from "../services/CommentService.js";

export class TowerEventController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowerEvents)
      .get('/:eventId', this.getTowerEventsById)
      .get('/:eventId/tickets', this.getTicketsByEventId)
      .get('/:eventId/comments', this.getCommentsByEventId)

      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTowerEvent)
      .put('/:eventId', this.updateTowerEventById)
      .delete('/:eventId', this.cancelTowerEventById)
  }

  async getTowerEvents(req, res, next) {
    try {
      const events = await towerEventService.getTowerEvents()
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getTowerEventsById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await towerEventService.getTowerEventsById(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getTicketsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await ticketService.getTicketsByEventId(eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getCommentsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const comments = await commentService.getCommentsByEventId(eventId)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }
  async createTowerEvent(req, res, next) {
    try {
      const eventData = req.body
      eventData.creatorId = req.userInfo.id
      const event = await towerEventService.createTowerEvent(eventData)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async updateTowerEventById(req, res, next) {
    try {
      const eventData = req.body
      eventData.creatorId = req.userInfo.id
      const eventId = req.params.eventId
      const event = await towerEventService.updateTowerEventById(eventData, eventId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async cancelTowerEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const event = await towerEventService.cancelTowerEventById(eventId, userId)
      return res.send(event)
    } catch (error) {
      next(error)
    }
  }
}