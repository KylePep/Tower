import { reactive } from 'vue'
import { commentsService } from "./services/CommentsService.js"

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/TowerEvents.js').TowerEvents[]} */
  events: [],

  activeEvent: null,
  /** @type {import('./models/Comment.js').Comment[]} */
  comments: [],
  /** @type {import('./models/Attendee.js').Attendee[]} */
  attendees: [],

  myTickets: []
})
