<template>
  <div>
    <black-board></black-board>
  </div>
</template>

<script>
import BlackBoard from "../components/BlackBoard.vue";
export default {
  components: {
    BlackBoard
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    }
  },
};
</script>

<style scoped>
</style>