<template>
  <section class="row p-3 bg-light ">
    <div class="col-3">
      <img :src="commentProp.creator.picture" :alt="commentProp.creator.name">
    </div>
    <div class="col-7">
      <div class="fs-3 fw-bold">
        {{ commentProp.creator.name }}
      </div>
      <div class="fs-4">
        {{ commentProp.body }}
      </div>
    </div>
    <div v-if="commentProp.creatorId == account.id" class="col-2 d-flex align-items-start justify-content-end">
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
img {
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
}
</style>