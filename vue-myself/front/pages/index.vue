<template>
  <div class="alert">
  </div>
</template>

<script>
import MemoPage from "./memo.vue";
export default {
  components: {
    MemoPage
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    }
  },
  middleware: "authenticated"
};
</script>

<style scoped>
.index {
  width: 98%;
}
.alert {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.alert div {
  width: 500px;
  height: 300px;
  border: 8px double #fff;
  color: #333;
  text-align: center;
  line-height: 300px;
  font-size: 1.5em;
}
</style>