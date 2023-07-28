<template>
  <router-link :to="{ name: 'Events', params: { eventId: towerEventProp.id } }">
    <div class="card elevation-5 eventBg border border-5 border-light rounded-4"
      :style="`background-image: url(${towerEventProp.coverImg})`">
      <div v-if="towerEventProp.isCanceled != false">
        <div
          class="d-flex text-black-50 fs-1 fw-bold position-absolute  cancelDisplay align-items-center justify-content-center px-5">
          <div>
            Canceled
          </div>
        </div>
      </div>
      <div class="titleSpace p-3 ">
      </div>
      <!-- <img :src="towerEventProp.coverImg" class="card-img-top" :alt="towerEventProp.name"> -->

      <div class=" detailSpace p-3">
        <h3 class="fw-bold fs-3">{{ towerEventProp.name }}</h3>
        <h4 class="card-text">{{ towerEventProp.type }}</h4>
        <div class="d-flex justify-content-between">
          <h5 class="card-text"> <span>{{ months[new
            Date(towerEventProp.startDate).getMonth()]
          }}</span> {{ new Date(towerEventProp.startDate).getDate() }}</h5>
          <h6 class="card-text">{{ towerEventProp.capacity - towerEventProp.ticketCount }} Spots Left</h6>
        </div>
      </div>
    </div>
  </router-link>
</template>


<script>
import { computed } from "vue";
import { TowerEvents } from "../models/TowerEvents.js";

export default {
  props: {
    towerEventProp: { type: Object, required: true }
  },
  setup(props) {
    return {
      months: computed(() => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']),
      propBackground: computed(() => {
        return `
        url(${props.towerEventProp.coverImg})
        `
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.titleSpace {
  height: 30vh;
}

.cancelDisplay {
  width: 100%;
  height: 30%;
  left: 0;
  top: 25%;
  background-color: rgba(255, 0, 0, 0.775);
}

.detailSpace {
  color: white;
  text-shadow: 2px 2px 0 black;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.14);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.3px);
  -webkit-backdrop-filter: blur(11.3px);
}

.eventBg {
  background-position: center;
  background-repeat: no-repeat;
  object-fit: cover;
}
</style>