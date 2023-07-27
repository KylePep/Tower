import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentsByEventId(eventId) {
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('[EVENT COMMENTS]', res.data)
    AppState.comments = res.data.map(d => new Comment(d))
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log('[COMMENT]', res.data)
    AppState.comments.push(new Comment(res.data))
  }

  async deleteComment(commentId) {
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log('[Deleted Comment]', res.data)
    AppState.comments = AppState.comments.filter(c => c.id != commentId)
  }

}
export const commentsService = new CommentsService()