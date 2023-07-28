<template>
  <main>

    <div class="container-fluid">
      <section class="row ">
        <div class="order-2 order-md-1 col-12 col-md-11 pe-0">

          <section class="row bg-color-3 fs-1 ps-3">
            <router-link :to="{ name: 'Home' }">
              <div class="col-2 selectable text-center text-color-5 custom-font">
                TOWER
              </div>
            </router-link>
          </section>

          <section class="row ">
            <router-view />
          </section>
        </div>
        <!-- NOTE sticky-top and fixed-top might break things -->
        <div class=" order-1 order-md-2  col-12 col-md-1 gradient-background">
          <Navbar />
        </div>

      </section>
    </div>
  </main>

  <footer class=" container-fluid sticky-bottom d-flex justify-content-end bg-dark">
    <button @click=" scrollTop()" class="btn btn-outline-primary ">
      TOP
      <!-- <i  class=" mdi mdi-arrow-up-bold-hexagon-outline text-primary text-shadow scroll-button"></i> -->
    </button>
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
        <input v-model="editable.name" class="form-control mb-3" type="text" id="name" name="name" placeholder="Name"
          required minlength="3" maxlength="100">
        <input v-model="editable.coverImg" class="form-control mb-3" type="url" id="coverImg" name="coverImg"
          placeholder="coverImg" required minlength="3" maxlength="500">
        <input v-model="editable.location" class="form-control mb-3" type="text" id="location" name="location"
          placeholder="location" required minlength="3" maxlength="100">
        <input v-model="editable.capacity" class="form-control mb-3" type="number" id="capacity" name="capacity"
          placeholder="capacity" required min="1" max="999">
        <select v-model="editable.type" class="form-control mb-3" name="type" id="type" required>
          <option value="concert">concert</option>
          <option value="convention">convention</option>
          <option value="sport">sport</option>
          <option value="digital">digital</option>
        </select>
        <input v-model="editable.startDate" class="form-control mb-3" type="datetime-local" id="startDate"
          name="startDate" placeholder="startDate" required>
        <textarea v-model="editable.description" class="form-control mb-3" name="description" id="description"
          placeholder="Description" cols="30" rows="5" required minlength="3" maxlength="1000"></textarea>
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

:root {
  --main-height: calc(100vh - 32px - 64px);
  --color1: #303A3F;
  --color2: #21364A;
  --color3: #356F93;
  --color4: #B9ABA1;
  --color5: #ffe4a1;
}

body {
  background-image: url(https://images.unsplash.com/photo-1688413708965-d4a7d3b0cc90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80);
  background-size: contain;
  background-attachment: fixed;
}

.custom-font {
  font-family: 'Ultra', serif;
}

.text-shadow {
  text-shadow: 2px 2px 0 var(--color1);
}

.gradient-background {
  background-image: linear-gradient(var(--color2), var(--color1));
}

.bg-color-1 {
  background-color: var(--color1);
}

.text-color-1 {
  color: var(--color1);
}

.bg-color-2 {
  background-color: var(--color2);
}

.text-color-2 {
  color: var(--color2);
}

.bg-color-3 {
  background-color: var(--color3);
}

.text-color-3 {
  color: var(--color3);
}

.bg-color-4 {
  background-color: var(--color4);
}

.text-color-4 {
  color: var(--color4);
}

.bg-color-5 {
  background-color: var(--color5);
}

.text-color-5 {
  color: var(--color5);
}


.view-reserved {
  min-height: 50vh;
}

.scroll-button {
  top: -16px;
  left: -16px;
  scale: 2;
}



footer {
  height: 32px;
}
</style>
