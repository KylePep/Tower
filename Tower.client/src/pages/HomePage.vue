<template>
  <section class="row">
    <div class="col-12 view-reserved d-flex flex-column justify-content-center fs-3 text-light">
      <p>
        This is what Tower is all About
      </p>
      <p>
        This is what Tower does
      </p>
      <p>
        This is why Tower does what it does
      </p>
    </div>
  </section>
  <div class="col-12 bg-primary  mb-3 py-3">
    <div class="btn-group d-flex justify-content-around" role="group" aria-label="Basic outlined example">
      <button @click="filterBy = ''" class="btn btn-outline-light px-5 py-3">All</button>
      <!-- <button @click="filterBy = ''" class="btn btn-outline-light">Expos</button> -->
      <button @click="filterBy = 'convention'" class="btn btn-outline-light">Conventions</button>
      <!-- <button @click="filterBy = ''" class="btn btn-outline-light">Exhibits</button> -->
      <button @click="filterBy = 'sport'" class="btn btn-outline-light">Sports</button>
      <button @click="filterBy = 'digital'" class="btn btn-outline-light">Digital</button>
      <button @click="filterBy = 'concert'" class="btn btn-outline-light">Concerts</button>
    </div>
  </div>
  <div v-for="event in events" :key="event.id" class="col-12 col-md-3 mb-3 pe-4 ">

    <TowerEventCard :towerEventProp="event" />
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Pop from "../utils/Pop.js";
import { towerEventsService } from "../services/TowerEventsService.js"
import { AppState } from "../AppState.js";

export default {
  setup() {
    const filterBy = ref('')
    async function getTowerEvents() {
      try {
        await towerEventsService.getTowerEvents()
      } catch (error) {
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getTowerEvents()
    })

    // function getEventBg(event) {
    //   const bgImg = event.coverImg
    //   return background-image: url(${bgImg})

    // }

    return {
      filterBy,
      events: computed(() => {
        if (filterBy.value == '') {
          return AppState.events
        } else {
          return AppState.events.filter(a => a.type == filterBy.value)
        }
      }),
      months: computed(() => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
      // eventBg: getEventBg()
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
