<template>
  <div id="root">
    <!-- 주간 달력 -->

    <!-- 주간 달력 -->

    <div class="flexWrap" v-if="me">
    <h2>
      <strong>Notice</strong>
    </h2>
      <!-- 중요 포스트 리스트 슬라이더 -->
      <a class="prev">
        <i class="fas fa-chevron-circle-left prev" @click.prevent="onSlider"></i>
      </a>
      <div class="screen">
        <ul class="contain animated" v-if="starPosts.length">
          <li v-for="(post, i) in starPosts" :key="`${post}${i}`" class="card-item" :class="$mq">
            <post-card :post="post"></post-card>
          </li>
        </ul>
      </div>
      <a class="next">
        <i class="fas fa-chevron-circle-right next" @click.prevent="onSlider"></i>
      </a>
      <!-- 중요 포스트 리스트 슬라이더 끝 -->
    </div>

    <!-- 회원가입  -->
    <div v-else>
      <signup-page></signup-page>
    </div>
  </div>
</template>

<script>
import PostCard from "../components/PostCard.vue";
import SignupPage from "./signup.vue";

export default {
  components: {
    PostCard,
    SignupPage
  },
  data() {
    return {
      distance: 0
    };
  },
  methods: { 
    async onSlider(e) {
      const listWrap = document.querySelector("ul.contain");
      if (e.target.classList.contains("prev") && (0 !== this.distance)) {
        await this.$store.dispatch("post/onSlider", {
          target: "prev"
        });
        this.distance += 380;
        listWrap.style.left = `${this.distance}px`;
      }else if (e.target.classList.contains("next") && (this.distance + this.starPosts.length*286 > 0)) {
        await this.$store.dispatch("post/onSlider", {
          target: "next"
        });
        listWrap.style.left = `${this.distance}px`;
        this.distance -= 380;
      }
    }
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
  mounted() {
    // setInterval(() => {
    //   console.log("simulate async data");
    //   if (this.swiperSlides.length < 10) {
    //     this.swiperSlides.push(this.swiperSlides.length + 1);
    //   }
    // }, 3000);
  },
  middleware: "authenticated"
};
</script>

<style scoped>
/* 포스트잇 CSS */
#root {
  width: 100%;
}
.flexWrap {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
.flexWrap a,
.flexWrap a i {
  display: inline-block;
  font-size: 50px;
  opacity: 0.5;
  color: darkgray;
  /* width: 80px; */
  height: 400px;
  line-height: 400px;
}
.screen {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 80%;
  height: 380px;
  overflow: hidden;
}
ul.contain {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -150px;
  min-width: 1000vw;
  overflow: hidden;
  height: 380px;
}
ul.animated {
  -webkit-transition: left 0.3s ease-in;
  transition: left 0.3s ease-in;
}
ul.contain > li.card-item {
  float: left;
  display: flex;
  width: 380px;
  min-height: 300px;
  margin: 0.5rem 0.5rem 0.5rem;
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #f5a9a9;
  background: #fbefef;
}
ul.contain > li.card-item > div#post-card {
  flex: 1 1 auto;
}

/* 반응형을 위한 CSS */
ul.contain.animated.pc {
  width: 1100px;
}
ul.contain > li.card-item.pc {
  width: 380px;
}
ul.contain > li.card-item.labtop {
  width: 380px;
  margin: 0.3rem 0.3rem 0.3rem;
}
ul.contain > li.card-item.tablet {
  width: 380px;
  margin: 0.3rem 0.3rem 0.3rem;
}
ul.contain > li.card-item.mobile {
  overflow-y: auto;
  overflow-x: none;
  width: 250px;
  height: 300px;
  /* margin: 0.3rem 0.3rem 0.3rem; */
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
</style>