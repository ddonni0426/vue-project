<template>
  <div id="root">
    <div v-if="me" class="weekly">
      <weekly-board :calInfo="calInfo"></weekly-board>
    </div>
    <h2 v-if="me" class="notice-title" :class="$mq">
      <strong>
        <i class="fas fa-star" /> IMPORTANT POST
        <i class="fas fa-star" />
      </strong>
    </h2>
    <div class="flexWrap" v-if="me">
      <!-- 중요 포스트 리스트 슬라이더 -->
      <template v-if="starPosts">
        <a class="prev">
          <i class="fas fa-chevron-circle-left prev" :class="$mq" @click.prevent="onSlider"></i>
        </a>
        <div class="screen" :class="$mq">
          <ul class="contain animated" :class="$mq" v-if="starPosts.length">
            <li v-for="(post, i) in starPosts" :key="`${post}${i}`" class="card-item" :class="$mq">
              <post-card :post="post"></post-card>
            </li>
          </ul>
        </div>
        <a class="next">
          <i class="fas fa-chevron-circle-right next" :class="$mq" @click.prevent="onSlider"></i>
        </a>
      </template>
      <div v-else>
        <p class="noimport">중요한 메모가 없습니다.</p>
      </div>
      <!-- 중요 포스트 리스트 슬라이더 끝 -->

      <!-- 중요 포스트 테블릿, 모바일 -->

      <!-- 중요 포스트 테블릿, 모바일 -->
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
import WeeklyBoard from "../components/WeeklyBoard.vue";

export default {
  components: {
    PostCard,
    SignupPage,
    WeeklyBoard
  },
  data() {
    return {
      distance: 0,
      days_name: ["일", "월", "화", "수", "목", "금", "토"],
      tab: { monthly: true, daily: false }
    };
  },
  methods: {
    async onSlider(e) {
      const listWrap = document.querySelector("ul.contain");
      if (e.target.classList.contains("prev") && 0 !== this.distance) {
        await this.$store.dispatch("post/onSlider", { target: "prev" });
        this.distance += 380;
        listWrap.style.left = `${this.distance}px`;
      } else if (
        e.target.classList.contains("next") &&
        this.distance + this.starPosts.length * 286 > 0
      ) {
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
    calInfo() {
      return this.$store.state.calendar.calInfo;
    },
    calendar() {
      return this.$store.state.calendar.calendar;
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
    await store.dispatch("calendar/loadCalendar", { reset: true });
    await store.dispatch("calendar/loadWeekPlan", {
      userId: store.state.user.me.id,
      first:
        store.state.calendar.calendar[
          `${store.state.calendar.calInfo.weekth}주차`
        ][0],
      reset: true
    });
    await store.dispatch("post/loadStars", {
      userId: store.state.user.me.id,
      reset: true
    });
    return;
  },
  mounted() {},
  middleware: "authenticated"
};
</script>

<style scoped>
/* 포스트잇 CSS */
#root {
  width: 100%;
  height: 100%;
}
.notice-title {
  font-size: 1.3rem;
  margin-top: 50px;
  margin-left: 80px;
  color: #333;
}
.notice-title.mobile {
  margin-left: 0;
  text-align: center;
}
.weekly {
  height: 400px;
}
.flexWrap {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 350px;
}
.flexWrap.mobile{
  margin-bottom: 65px;
}

.flexWrap a,
.flexWrap a i {
  display: inline-block;
  font-size: 1.7rem;
  opacity: 0.9;
  color: #333;
  /* width: 80px; */
  height: 350px;
  line-height: 400px;
}
a > i.mobile {
  display: none;
}
.screen {
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 90%;
  height: 340px;
  overflow: hidden;
}
.screen.mobile {
  width: 95%;
  display: block;
  overflow: unset;
}
ul.contain {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -150px;
  min-width: 1000vw;
  overflow: hidden;
  height: 350px;
}
ul.contain.mobile {
  position: unset;
  margin-top: 10px;
  min-width: 80%;
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow: unset;
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
ul.contain.mobile > li.card-item.mobile {
  overflow-y: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-x: none;
  width: 100%;
  height: 280px;
  margin: 0.3rem 0.3rem 0.3rem;
}
ul.contain.mobile > li.card-item:last-child.mobile{
  margin-bottom: 100px;
}

p.noimport {
  margin: 50px auto;
  width: 100%;
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