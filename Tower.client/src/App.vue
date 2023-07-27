<template>
  <!-- <div id="scrollspyHeading1">Nav Link 1</div> -->

  <main>

    <div class="container-fluid">
      <section class="row ">
        <div class="order-2 order-md-1 col-12 col-md-11 pe-0">

          <section class="row bg-primary text-light fs-1 ps-3">
            Tower
          </section>

          <section class="row ">
            <router-view />
          </section>
        </div>
        <!-- NOTE sticky-top and fixed-top might break things -->
        <div class=" order-1 order-md-2  col-12 col-md-1 bg-secondary">
          <Navbar />
        </div>

      </section>
    </div>
  </main>

  <footer class="d-flex text-light sticky-bottom justify-content-end pe-3 pb-5">
    <i @click="scrollTop()" class=" mdi mdi-arrow-up-bold-hexagon-outline text-primary fs-1 selectable text-shadow"></i>
  </footer>

  <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel">
        Create an Event
      </h5>
      <div type="button" class="mdi mdi-close-thick text-light bg-dark" data-bs-dismiss="offcanvas" aria-label="Close">
      </div>
    </div>
    <div class="offcanvas-body">
      <form @submit.prevent="createTowerEvent()">
        <input v-model="editable.name" class="form-control mb-3" type="text" id="name" name="name" placeholder="Name">
        <input v-model="editable.coverImg" class="form-control mb-3" type="url" id="coverImg" name="coverImg"
          placeholder="coverImg">
        <input v-model="editable.location" class="form-control mb-3" type="text" id="location" name="location"
          placeholder="location">
        <input v-model="editable.capacity" class="form-control mb-3" type="number" id="capacity" name="capacity"
          placeholder="capacity">
        <select v-model="editable.type" class="form-control mb-3" name="type" id="type">
          <option value="concert">concert</option>
          <option value="convention">convention</option>
          <option value="sport">sport</option>
          <option value="digital">digital</option>
        </select>
        <input v-model="editable.startDate" class="form-control mb-3" type="date" id="startDate" name="startDate"
          placeholder="startDate">
        <textarea v-model="editable.description" class="form-control" name="description" id="description"
          placeholder="Description" cols="30" rows="10"></textarea>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-success"><i class="mdi mdi-plus-thick"></i>Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { towerEventsService } from "./services/TowerEventsService.js"
import Pop from "./utils/Pop.js"
import { Modal, Offcanvas } from "bootstrap"
import { useRouter } from "vue-router"

export default {
  setup() {
    const editable = ref({})
    const router = useRouter()
    return {
      editable,
      router,
      appState: computed(() => AppState),
      scrollTop() {
        document.documentElement.scrollTop = 0
      },
      async createTowerEvent() {
        try {
          const eventData = editable.value
          const event = await towerEventsService.createTowerEvent(eventData)

          Offcanvas.getInstance('#offcanvasRight').hide()
          editable.value = {}
          router.push({ name: 'Events', params: { eventId: event.id } })

        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

body {
  background-image: url(https://images.unsplash.com/photo-1599739291639-61c85ed2ed30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80);
  background-size: cover;
  background-attachment: fixed;
}

.text-shadow {
  text-shadow: 2px 2px 0 rgb(20, 97, 161);
}



.view-reserved {
  min-height: 50vh;
}

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
