<template>
  <section id="right" :class="$mq">
    <!-- 모바일, 테블릿 검색창 -->
    <span class="search" :class="$mq">
      <input type="text" placeholder="검색어 입력하세요." v-model="kWord" @input.prevent="detectSearch" />
      <i class="fas fa-search" @click.prevent="onSearch"></i>
    </span>

    <!-- 메모 입력창 -->
    <div>
      <post-form></post-form>
    </div>

    <!-- 메모 리스트 -->
    <div class="flexWrap">
      <ul class="post-card" v-if="posts.length">
        <li
          v-for="post in posts"
          :key="`${post.id}${Math.random()}`"
          class="card-item"
          :class="$mq"
        >
          <div>
            <post-card :post="post"></post-card>
          </div>
        </li>
      </ul>
    </div>
    <!-- 메모 리스트 끝 -->
  </section>
</template>

<script>
import PostForm from "../components/PostForm.vue";
import PostCard from "../components/PostCard.vue";
import debounce from "lodash.debounce";

export default {
  components: { PostForm, PostCard },
  data() {
    return {
      kWord: "",
      keyword: ""
    };
  },
  computed: {
    posts() {
      return this.$store.state.post.posts;
    },
    me() {
      return this.$store.state.user.me;
    },
  hasMorePost() {
    return this.$store.state.post.hasMorePost;
  }
  },
  methods: {
    onScroll() {
      if (
        document.documentElement.scrollHeight - 100 <
        document.documentElement.clientHeight + window.scrollY
      ) {
        if (this.hasMorePost) {
          this.$store.dispatch("post/loadPosts", { userId: this.me.id });
        }
      }
    },
    onSearch() {
      return (this.keyword = this.kWord);
    },
    detectSearch: debounce(async function() {
      await this.onSearch();
      const res = await this.$store.dispatch("post/search", {
        userId: this.$store.state.user.me.id,
        keyword: encodeURIComponent(this.keyword)
      });
      if (this.keyword === "") {
        await this.$store.dispatch("post/loadPosts", {
          userId: this.$store.state.user.me.id,
          reset: true
        });
      }
      return;
    }, 50)
  },
  async fetch({ store }) {
    await store.dispatch("todo/loadTodos", {
      userId: store.state.user.me.id,
      reset: true
    });
    await store.dispatch("post/loadPosts", {
      userId: store.state.user.me.id,
      reset: true
    });
    return;
  },
  mounted() {
    //created에서는 DOM이나 window객체 못 씀
    window.addEventListener("scroll", this.onScroll,0);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  middleware: "authenticated", //로그인 한 사람만 접근가능
};
</script>

<style scoped>
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
#right {
  width: 100%;
  margin: 0 20px;
}
#right.labtop {
  margin: 0 13px;
}
#right.mobile {
  margin: 0 5px;
}
ul {
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