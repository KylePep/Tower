<template>
  <section v-if="activeTowerEvent" class="row bg-dark rounded ">
    <div class="col-12 view-reserved d-flex flex-column justify-content-center fs-3 text-light p-3">
      <section class="row">
        <div class="col-12 col-md-3 position-relative pb-3 ">
          <img class="img-fluid detailsImg " :src="activeTowerEvent.coverImg" :alt="activeTowerEvent.name">
          <div v-if="activeTowerEvent.isCanceled != false">
            <div class="text-dark fs-1 position-absolute bg-danger cancelDisplay text-center">
              Canceled
            </div>
          </div>

        </div>
        <div class="col-12 col-md-9">
          <section class="row">
            <div>

            </div>
            <div v-if="account.id == activeTowerEvent.creatorId && activeTowerEvent.isCanceled == false"
              class="d-flex justify-content-end">
              <button @click="cancelEvent(activeTowerEvent.id)" class="btn btn-danger"> Cancel Event</button>
            </div>
          </section>
          <section class="row">
            <div class="col-6">
              <h1>{{ activeTowerEvent.name }}</h1>
              <h2>{{ activeTowerEvent.location }}</h2>
            </div>
            <div class="col-6 text-end">
              <h2>{{ new Date(activeTowerEvent.startDate).getDate() }} <span>{{ months[new
                Date(activeTowerEvent.startDate).getMonth()] }}</span>
              </h2>
              <h3> Starting at
                {{ Math.floor(Math.random() * 10) }}
              </h3>
            </div>
          </section>
          <section class="row">
            <h5 class="py-3">
              {{ activeTowerEvent.description }}
            </h5>
            <div v-if="activeTowerEvent.capacity - activeTowerEvent.ticketCount <= 0"
              class="bg-warning text-dark text-center">
              Sold out
            </div>
            <div v-else>
              <h6 v-if="account.id && activeTowerEvent.isCanceled == false" class="d-flex justify-content-between">
                <div v-if="activeTowerEvent.isCanceled == false">{{ activeTowerEvent.capacity -
                  activeTowerEvent.ticketCount
                }} Spots Left</div>
                <div v-if="!alreadyAttending">
                  <button @click="createTicket()" class="btn btn-warning"><i class="mdi mdi-account-plus"></i>
                    Attend</button>
                </div>
                <div v-else>
                  <div class="btn btn-outline-light">
                    Attending
                  </div>
                </div>
              </h6>
            </div>
          </section>
        </div>
      </section>
    </div>
  </section>


  <section class="row bg-primary p-3 ">
    <div class="d-flex flex-row">
      <img v-for="attendee in attendees" :key="attendee.id" class="attendeeImg" :src="attendee.profile.picture"
        :alt="attendee.profile.name" :title="attendee.profile.name">
    </div>
  </section>
  <section class="row pe-0">
    <div class="col-12 col-md-9 m-auto bg-info">
      <form v-if="account.id == activeTowerEvent?.creatorId && activeTowerEvent?.isCanceled == false"
        @submit.prevent="createComment()" class="col-12 pt-3 px-md-3">
        <label for="body" class="fs-3 fw-bold">Comment</label>
        <textarea v-model="editable.body" class="form-control" name="body" id="body" cols="30" rows="3"
          placeholder="Comment"></textarea>
        <div class="d-flex justify-content-end py-3">
          <button class="btn btn-success">Submit</button>
        </div>
      </form>
      <div v-for="comment in comments" :key="comment.id" class="col-12 m-auto text-light pb-3 p-md-5">
        <CommentCard :commentProp=comment />
      </div>
    </div>
  </section>
</template>


<script>
import { computed, ref, watchEffect } from "vue"
import { useRoute } from "vue-router"
import { AppState } from "../AppState.js"
import Pop from "../utils/Pop.js"
import { towerEventsService } from "../services/TowerEventsService.js"
import { commentsService } from "../services/CommentsService.js"
import { attendeesService } from "../services/AttendeesService.js"

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})

    async function getTowerEventById(eventId) {
      try {
        await towerEventsService.getTowerEventById(eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    async function getCommentsByEventId(eventId) {
      try {
        await commentsService.getCommentsByEventId(eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }
    async function getTicketsByEventId(eventId) {
      try {
        await attendeesService.getTicketsByEventId(eventId)
      } catch (error) {
        Pop.error(error.message)
      }
    }

    watchEffect(() => {
      getTowerEventById(route.params.eventId)
      getCommentsByEventId(route.params.eventId)
      getTicketsByEventId(route.params.eventId)


    })
    return {
      editable,
      AppState: computed(() => AppState),
      account: computed(() => AppState.account),
      activeTowerEvent: computed(() => AppState.activeEvent),
      comments: computed(() => AppState.comments),
      attendees: computed(() => AppState.attendees),
      alreadyAttending: computed(() => {
        const attends = AppState.attendees.find(attendee => attendee.accountId == AppState.account.id)
        return attends
      }),
      months: computed(() => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
      async createTicket() {
        try {
          const ticketData = {}
          ticketData.eventId = route.params.eventId
          await attendeesService.createTicket(ticketData)
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async createComment() {
        try {
          const commentData = editable.value
          commentData.eventId = route.params.eventId
          await commentsService.createComment(commentData)
          editable.value = {}
        } catch (error) {
          Pop.error(error.message)
        }
      },
      async cancelEvent(eventId) {
        try {
          const cancelConfirm = await Pop.confirm('Do you want to cancel this event?')
          if (!cancelConfirm) {
            return
          }
          await towerEventsService.cancelEvent(eventId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.detailsImg {
  object-fit: cover;
  object-position: center;
}

.cancelDisplay {
  width: 100%;
  left: 0;
  top: 25%;
}

.attendeeImg {
  height: 5vh;
  width: 5vh;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>