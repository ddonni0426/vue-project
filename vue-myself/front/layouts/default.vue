<template>
  <div id="app">
    <div id="wrapper">
      <!-- Navigator 시작-->
      <div class="naviWrap" :class="$mq" v-if="me">
        <nav id="pc-bar">
          <nuxt-link to="/" id="home" class="link">홈</nuxt-link>
          <nuxt-link to="/memo" id="memo" class="link">메모</nuxt-link>
          <nuxt-link to="/calendar" id="calendar" class="link">일정</nuxt-link>
          <nuxt-link to="/setting" id="setting" class="link">설정</nuxt-link>
          <div class="searchBox">
            <span v-if="me">
              <input
                type="text"
                placeholder="검색어 입력하세요."
                v-model="kWord"
                @input.prevent="detectSearch"
              />
              <i class="fas fa-search" @click.prevent="detectSearch"></i>
            </span>
          </div>
        </nav>
      </div>
      <!-- Navigator 끝-->
      <!-- Login Box -->
      <login-form class="loginBox"></login-form>
    </div>
    <!-- 페이지 부분 -->
    <section id="page" :class="$mq">
      <div id="left-page" v-if="me" :class="$mq">
        <left-side></left-side>
      </div>
      <div id="right-page" :class="$mq">
        <nuxt v-if="!keyword" />
        <div v-else>
          <search-card></search-card>
        </div>
        <a href="#" class="goTop" :class="$mq">
          <i class="far fa-arrow-alt-circle-up"></i>
        </a>
      </div>
    </section>
    <!-- 테블릿 이하  하단 메뉴시작 -->
    <div class="tab-naviWrap" :class="$mq" v-if="me">
    <div class="under-nav" :class="$mq"></div>
      <nav id="tab-bar">
        <ul>
          <li>
            <nuxt-link to="/">
              <i class="fas fa-home m-btn" :class="$mq"></i>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/memo">
              <i class="fas fa-border-all m-btn" :class="$mq"></i>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/todo">
              <i class="far fa-list-alt m-btn" :class="$mq"></i>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/calendar">
              <i class="far fa-calendar-alt m-btn" :class="$mq"></i>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/setting">
              <i class="fas fa-user-cog m-btn" :class="$mq"></i>
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
    <!-- 테블릿 이하 메뉴 끝 -->
  </div>
</template>

<script>
import LeftSide from "../components/LeftSide.vue";
import LoginForm from "../components/LoginForm.vue";
import SearchCard from "../components/search.vue";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";

export default {
  components: {
    LeftSide,
    LoginForm,
    SearchCard
    // SettingPage
  },
  data() {
    return {
      email: this.email,
      password: this.password,
      kWord: "",
      keyword: ""
    };
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    }
  },
  methods: {
    onScroll: throttle(function() {
      const goTop = document.querySelector(".goTop i");
      if (
        document.documentElement.scrollHeight - 500 <
        document.documentElement.clientHeight + window.scrollY
      ) {
        goTop.style.color = "#333";
      } else {
        goTop.style.color = "transparent";
      }
    }, 1000),

    detectSearch: debounce(async function() {
      this.keyword = this.kWord;
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
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style scoped>
#app {
  position: relative;
}
#wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  background: #333;
  border-bottom: 8px double #fff;
}
#wrapper .loginBox {
  position: absolute;
  right: 0;
  display: flex;
  height: 35px;
  justify-content: flex-end;
  padding: 0.8em 0;
}
#wrapper .loginBox.mobile {
  position: absolute;
  right: 0;
}
.naviWrap #pc-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
}
.naviWrap #pc-bar a {
  display: inline-block;
  width: 70px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 1.1em;
  font-weight: normal;
  color: #fff;
  margin-left: 10px;
}
.naviWrap.tablet {
  display: none;
}
.naviWrap.mobile {
  display: none;
}
.fa-bars.pc,
.fa-bars.labtop {
  display: none;
}
.searchBox {
  margin-right: 10px;
}
i {
  color: #fff;
}
input {
  border: none;
  color: #fff;
  border-bottom: 1px solid #fff;
  padding: 5px;
  background: transparent;
}
#page {
  height: 88vh;
  max-height: 97vh;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 17px auto 0;
}

#page #left-page {
  flex-basis: 400px;
  flex-shrink: 0;
}
#page #left-page.tablet,
#page #left-page.mobile {
  display: none;
}
#page #right-page {
  /* position: relative; */
  width: 100%;
  flex: 1 1 0;
  border-left: 1px solid #333;
  display: flex;
  justify-content: space-evenly;
}
#page #right-paget.mobile {
  flex-grow: 1;
  max-height: 100vh;
  overflow-y: auto;

}

#page #right-page.tablet,
#page #right-page.mobile {
  border-left: 0;
  min-height: 100%;
}
#right-page #routingPage {
  width: 100%;
  margin: 0 auto;
}

/* 하단 메뉴 css*/
.tab-naviWrap.tablet,
.tab-naviWrap.mobile {
  position: fixed;
  height: 65px;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #333;
}
#tab-bar ul {
  display: flex;
  justify-content: space-evenly;
  line-height: 65px;
}
#tab-bar ul li {
  display: inline-block;
  padding: 0 10px;
}
#tab-bar ul li .m-btn {
  font-size: 1.6rem;
  line-height: 65px;
}
#tab-bar .m-btn.labtop,
#tab-bar .m-btn.pc {
  display: none;
  color: transparent;
}
.tab-naviWrap.tablet > #tab-bar > button {
  margin: 0 20px;
  font-size: 1.7rem;
}
.tab-naviWrap.mobile > #tab-bar > button {
  margin: 0 20px;
  font-size: 1.7rem;
}

/* 하단 메뉴 css 끝*/
.goTop {
  display: block;
  position: fixed;
  bottom: 4rem;
  right: 1.2rem;
}
.goTop i {
  font-size: 50px;
  color: transparent;
  opacity: 0.7;
  transition: 0.2s;
}
.fa-arrow-alt-circle-up:hover:before,
.goTop i:hover {
  color: #333;
}
.goTop.mobile i {
  font-size: 35px;
}
</style>