<template>
  <div>
    <black-board></black-board>
  </div>
</template>

<script>
import BlackBoard from "../layouts/BlackBoard.vue";
export default {
  components: {
    BlackBoard
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    }
  },
  fetch({ store }) {
  console.log('인덱스 페이지 패치')
    if (store.state.user.me) {
      return store.dispatch("todo/loadTodos", {
        userId: store.state.user.me.id,
        reset: true
      });
    }
    return;
  }
};
</script>

<style scoped>
</style>