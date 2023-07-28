<template>
  <section class="row p-3 bg-light d-flex align-items-center ">
    <div class="order-1 order-md-1 col-6 col-md-3">
      <img class="avatar-img" :src="commentProp.creator.picture" :alt="commentProp.creator.name">
    </div>
    <div class="order-3 order-md-2 col-12 col-md-7 text-center">
      <div class="fs-3 fw-bold">
        {{ commentProp.creator.name }}
      </div>
      <div class="fs-4">
        {{ commentProp.body }}
      </div>
    </div>
    <div v-if="commentProp.creatorId == account.id"
      class="order-1 order-md-3 col-6 col-md-2 d-flex align-items-start justify-content-end">
      <button @click="deleteComment(commentProp.id)" class="btn btn-danger fs-6">
        Delete <i class="mdi mdi-close"></i>
      </button>
    </div>
  </section>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Comment } from "../models/Comment.js";
import Pop from "../utils/Pop.js";
import { commentsService } from "../services/CommentsService.js";

export default {
  props: {
    commentProp: { type: Comment, required: true }
  },
  setup() {
    return {
      account: computed(() => AppState.account),

      async deleteComment(commentId) {
        try {
          const confirmDelete = await Pop.confirm('Do you want to delete this comment?')
          if (!confirmDelete) {
            return
          }
          await commentsService.deleteComment(commentId)
        } catch (error) {
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .avatar-img {
    height: 8vh;
    width: 8vh;

  }
}

@media screen and (max-width: 768px) {
  .avatar-img {
    height: 7vh;
    width: 7vh;

  }
}

img {
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>