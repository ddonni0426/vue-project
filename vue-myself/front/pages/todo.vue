<template>
  <div class="todo" :class="$mq">
    <left-side></left-side>
  </div>
</template>

<script>
import LeftSide from "../components/LeftSide.vue";

export default {
  components: {
    LeftSide
  },
  middleware: "authenticated" //로그인 한 사람만 접근가능
};
</script>

<style scoped>
.todo.labtop,
.todo.pc{
  display: none;
}
</style>