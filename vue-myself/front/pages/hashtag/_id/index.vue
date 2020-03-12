<template>
  <section id="right">
    <div class="flexWrap">
      <ul class="post-card" :class="$mq">
        <li v-for="post in posts" :key="post.id" class="card-item" :class="$mq">
          <div>
            <post-card :post="post"></post-card>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import PostCard from "~/components/PostCard.vue";

export default {
  components: {
    PostCard
  },
  data() {
    return {
      name: "Nuxt.js"
    };
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    },
    posts() {
      return this.$store.state.post.posts;
    },
    hasMorePost() {
      return this.$store.state.post.hasMorePost;
    }
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
    },
    mounted() {
      //created에서는 DOM이나 window객체 못 씀
      window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.onScroll);
    }
  },
    fetch({ store, params }) {
      return Promise.all([
        store.dispatch("post/loadHashtagPosts", {
          hashtag: encodeURIComponent(params.id),
          userId: store.state.user.me.id,
          reset: true
        })
      ]);
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
ul.post-card.mobile {
  width: 100%;
  margin: 0;
}
ul.post-card > .card-item.mobile {
  width: 90%;
  margin: 0;
  margin-bottom: 1.3rem;
}
/* 검색창 */
.search.pc,
.search.labtop {
  display: none;
}
.search.tablet,
.search.mobile {
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 50px;
}
.search.tablet input,
.search.mobile input {
  padding-bottom: 3px;
  border-bottom: 1px solid #333;
}
</style>