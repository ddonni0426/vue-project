<template>
  <div>
    <div id="wrapper">
      <!-- Navigator 시작-->
      <div class="naviWrap" :class="$mq" v-if="me">
        <nav id="pc-bar">
          <nuxt-link to="/memo" id="memo" class="link">메모</nuxt-link>
          <nuxt-link to="/sketch" id="home" class="link">스케치</nuxt-link>
          <nuxt-link to="/setting" id="setting" class="link">설정</nuxt-link>
          <div class="searchBox">
            <span v-if="me">
              <input
                type="text"
                placeholder="검색어 입력하세요."
                v-model="kWord"
                @input.prevent="detectSearch"
              />
              <i class="fas fa-search" @click.prevent="onSearch"></i>
            </span>
          </div>
        </nav>
      </div>

      <!-- 테블릿 이하 메뉴시작 -->
      <div class="tab-naviWrap" :class="$mq" v-if="me">
        <nav id="tab-bar">
          <ul>
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
              <nuxt-link to="/sketch">
                <i class="fas fa-palette m-btn" :class="$mq"></i>
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
      <!-- Navigator 끝-->

      <!-- Login Box -->
      <login-form class="loginBox" :class="$mq"></login-form>
    </div>
    <!-- 페이지 부분 -->
    <section id="page">
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
  </div>
</template>

<script>
import LeftSide from "./LeftSide.vue";
import LoginForm from "./LoginForm.vue";
import SearchCard from "../pages/search.vue";
import Setting from "../pages/setting.vue";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";

export default {
  components: {
    LeftSide,
    LoginForm,
    SearchCard,
    Setting
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
    todoPage() {},

    onScroll: throttle(function() {
      const goTop = document.querySelector(".goTop");
      if (
        document.documentElement.scrollHeight - 500 <
        document.documentElement.clientHeight + window.scrollY
      ) {
        goTop.style.display = "block";
      } else {
        goTop.style.display = "none";
      }
    }, 600),

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
    }, 50),
    dropMenu() {
      console.log("드롭다운");
    }
  },
  mounted() {
    //created에서는 DOM이나 window객체 못 씀!!!
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style scoped>
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
display: none;
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
.tab-naviWrap.tablet > #tab-bar > button {
  margin: 0 20px;
  font-size: 1.7rem;
}
/* 드롭메뉴 버튼 */
.tab-naviWrap.mobile > #tab-bar > button {
  margin: 0 20px;
  font-size: 1.7rem;
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
  flex-basis: 360px;
  flex-shrink: 0;
}
#page #left-page.tablet,
#page #left-page.mobile {
  display: none;
}
#page #right-page {
  position: relative;
  width: 100%;
  flex: 1 1 0;
  border-left: 1px solid #333;
  display: flex;
  justify-content: space-evenly;
}
#page #right-page.tablet,
#page #right-page.mobile {
  border-left: 0;
}
#right-page #routingPage {
  width: 100%;
  margin: 0 auto;
}
#tab-bar ul li {
  display: inline-block;
  padding: 0 10px;
}
#tab-bar ul li .m-btn {
  font-size: 1.2rem;
}

#tab-bar .m-btn.labtop,
#tab-bar .m-btn.pc {
  display: none;
  color: transparent;
}
.goTop {
  display: none;
  position: fixed;
  bottom: 1.2rem;
  right: 1.2rem;
}
.goTop i {
  font-size: 50px;
  color: #333;
  opacity: 0.7;
  transition: 1s;
}
.goTop.mobile i {
  font-size: 35px;
}
</style>