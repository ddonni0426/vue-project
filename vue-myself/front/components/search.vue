<template>
  <section id="right">
    <div class="flexWrap">
      <ul class="post-card" v-if="posts.length">
        <li v-for="post in posts" :key="post.id" class="card-item">
          <div>
            <post-card :post="post"></post-card>
          </div>
        </li>
      </ul>
      <div v-else>
        <p> 검색결과가 존재하지 않습니다.</p>
      </div>
    </div>
  </section>
</template>

<script>
import PostCard from "./PostCard.vue";
export default {
  components: {
    PostCard
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    },
    posts() {
      return this.$store.state.post.posts;
    },
  },
  methods: {
    onScroll() {
      if (
        document.documentElement.scrollHeight - 300 <
        document.documentElement.clientHeight + window.scrollY
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch("post/loadHashtagPosts", { userId: this.me.id });
        }
      }
    }
  },
  mounted() {
    //created에서는 DOM이나 window객체 못 씀
    window.addEventListener("scroll", this.onScroll,0);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style scoped>
#right {
  width: 100%;
  margin: 0 20px;
}
ul {
  min-width: 100%;
}
ul.post-card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
ul.post-card > li.card-item {
  display: flex;
  flex: 0 0 auto;
  min-height: 300px;
  width: 400px;
  justify-content: flex-start;
  margin: 0 0.8rem 1rem;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid gold;
  background: #f5f6ce;
}

ul.post-card > li.card-item > div {
  flex: 1 1 auto;
}
.noresult{
  height: 50px;
}
</style>