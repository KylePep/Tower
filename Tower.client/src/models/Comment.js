export class Comment {
  constructor(data) {
    this.creatorId = data.creatorId
    this.eventId = data.eventId
    this.body = data.body
    this.isAttending = data.isAttending
    this.id = data.id
    this.creator = data.creator
  }
}