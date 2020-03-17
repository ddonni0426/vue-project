<template>
  <div class="flexWrap" v-if="me">
    <!-- 중요 포스트 리스트 슬라이더 -->
    <ul class="post-card" v-if="starPosts.length">
      <li
        v-for="post in starPosts"
        :key="`${post.id}${Math.random()}`"
        class="card-item"
        :class="$mq"
      >
        <div>
          <post-card :post="post"></post-card>
        </div>
      </li>
    </ul>
    <!-- 중요 포스트 리스트 슬라이더 끝 -->
  </div>
  <div v-else>
    <signup-page></signup-page>
  </div>
</template>

<script>
import PostCard from "../components/PostCard.vue";
import SignupPage from "./signup.vue";
export default {
  components: {
    PostCard,
    SignupPage,
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    },
    starPosts() {
      return this.$store.state.post.starPosts;
    },
    events() {
      return this.$store.state.calender.events;
    }
  },
  async fetch({ store }) {
    await store.dispatch("todo/loadTodos", {
      userId: store.state.user.me.id,
      reset: true
    });
    await store.dispatch("post/loadStars", {
      userId: store.state.user.me.id,
      reset: true
    });
    return;
  },
  middleware: "authenticated"
};
</script>

<style scoped>
.flexWrap {
  width: 100%;
}
.main-weekly {
  width: 90%;
  height: 400px;
  margin: 0 auto 20px;
}
.flexWrap ul {
  width: 100%;
}
ul.post-card {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}
ul.post-card > li.card-item {
  display: flex;
  width: 31.5%;
  flex: 0 0 auto;
  min-height: 300px;
  margin: 0.5rem 0.5rem 0.5rem;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #f5a9a9;
  background: #fbefef;
}
ul.post-card > li.card-item.labtop {
  width: 48%;
  margin: 0.3rem 0.3rem 0.3rem;
}
ul.post-card > li.card-item.tablet {
  width: 97%;
  margin: 0.3rem 0.3rem 0.3rem;
}
ul.post-card > li.card-item.mobile {
  width: 98%;
  margin: 0.3rem 0.3rem 0.3rem;
}

/* 포스트잇 색상 변경가능하도록.
gold 
#FBEFEF #F5A9A9 분홍 
#F6CECE
#F6CED8
#E3F6CE #04B404
#F5F6CE gold
#E6E6E6
#ECE0F8 #AC58FA 연보라

 */
ul.post-card > li.card-item > div {
  flex: 1 1 auto;
}
</style>