import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CommentService {

  async createComment(commentData) {
    const comment = (await dbContext.Comment.create(commentData)).populate('creator', 'name profile')
    return comment
  }
  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comment.find({ eventId }).populate('creator', 'name picture')
    return comments
  }

  async removeCommentById(commentId, userId) {
    const comment = await dbContext.Comment.findById(commentId)
    if (!comment) {
      throw new BadRequest(`Comment with ID${commentId} does not exist`)
    }
    // FIXME added to sting here if things break check that
    if (comment.creatorId != userId) {
      throw new Forbidden('You can not delete a comment you do not own')
    }
    await comment.remove()
    return `${comment} has been removed`
  }

}
export const commentService = new CommentService()