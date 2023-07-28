<template>
  <section class="row text-color-5 fs-1 fw-bold ps-3 py-3">
    My Events
    <div v-if="!myEvents">
      You have not created any events
    </div>
    <div v-else class="row text-light">
      <div v-for="myEvent in myEvents" :key="myEvent.id" class="col-12 col-md-3 mb-3">
        <TowerEventCard :towerEventProp="myEvent" />
      </div>
    </div>
  </section>
  <section class="row text-color-5 fs-1 fw-bold pb-3">
    <div class="pb-3">
      Upcoming Events
    </div>
    <section class="row">
      <div v-for="ticket in tickets" :key="ticket.id" class="col-12 col-md-7 m-auto pb-3 ps-4 pe-2 ">
        <div class="row gradient-background rounded d-flex justify-content-between elevation-5">
          <div class="col-6 col-md-4 ps-0 position-relative">
            <router-link :to="{ name: 'Events', params: { eventId: ticket.event.id } }">
              <img :src="ticket.event.coverImg" class="img-fluid ticketImg" :alt="ticket.event.name">
            </router-link>
            <div v-if="ticket.event.isCanceled != false">
              <div
                class="d-flex text-black-50 fs-1 fw-bold position-absolute  cancelDisplay align-items-center justify-content-center px-5">
                <div>
                  Canceled
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-8 fs-4 d-flex flex-row justify-content-end align-items-center">

            <div>
              {{ ticket.event.name }}
            </div>

            <!-- <div class="d-flex justify-content-end"> -->
            <button @click="removeTicket(ticket.id)" class="btn btn-danger mx-2 my-3">Unattend</button>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import { logger } from "../utils/Logger.js";
import { attendeesService } from "../services/AttendeesService.js";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute
    async function getTowerEvents() {
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    async function getMyTickets() {
      try {
        await attendeesService.getMyTickets()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getTowerEvents()
    })

    watchEffect(() => {
      getMyTickets(AppState.account.id)

    })

    // TODO get tickets
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets),
      myEvents: computed(() => {
        const myEvents = AppState.events.filter(event => event.creatorId == AppState.account.id)
        logger.log('[MY EVENTS]', myEvents)
        return myEvents
      }),
      async removeTicket(ticketId) {
        try {
          await attendeesService.removeTicket(ticketId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>

<style scoped>
img {}

.cancelDisplay {
  width: 100%;
  height: 30%;
  left: 0;
  top: 35%;
  background-color: rgba(255, 0, 0, 0.775);
}

.ticketImg {
  height: 20vh;
  width: 20vh;
  object-fit: cover;
  object-position: center;
}

.row,
.col-12 {
  padding-right: 0;
}
</style>
