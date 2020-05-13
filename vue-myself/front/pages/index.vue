<template>
  <div id="root" :class="$mq">
    <div class="flexWrap" v-if="me" :class="$mq">
      <h3>오늘의 기분을 마음껏 표현해 주세요</h3>
      <feeling-form></feeling-form>
      <textarea
        type="text"
        placeholder="아무에게도 말 못할 비밀이 있나요?"
        v-model="mood"
        class="mood"
        @input.prevent="moodInput"
        :class="$mq"
      />
      <small :class="$mq">로그아웃 시 자동 삭제 됩니다!!</small>
      <a href="#" id="download-diary" download="diary.txt">
        <input type="button" value="내려받기" title="내려받기" @click.prevent="downloadDiary" />
      </a>
      <feeling-chart :feel="feel"></feeling-chart>
    </div>
    <!-- 회원가입  -->
    <div v-else>
      <signup-page></signup-page>
    </div>
  </div>
</template>
<script>
import SignupPage from "./SignupPage.vue";
import debounce from "lodash.debounce";
import FeelingForm from "../components/FeelingForm.vue";
import FeelingChart from "../components/FeelingChart.vue";

export default {
  components: {
    SignupPage,
    FeelingForm,
    FeelingChart
  },
  data() {
    return {
      mood: ""
    };
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    },
    feel() {
      return this.$store.state.feeling.feeling;
    }
  },
  methods: {
    downloadDiary() {
      let content = this.mood;
      let date = new Date();
      let title = `${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getUTCSeconds()}.txt`;

      let link = document.querySelector("#download-diary");
      link.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(content)
      );
      link.setAttribute("download", title);
      link.click();
    },

    moodInput: debounce(async function() {
      try {
        sessionStorage.setItem("diary", this.mood);
      } catch (error) {
        console.log(error);
      }
      return;
    }, 1000)
  },
  async fetch({ store }) {
    if (store.state.user.me) {
      let me = store.state.user.me.id;
      await store.dispatch("todo/loadTodos", {
        userId: me,
        reset: true
      });
      await store.dispatch("feeling/getfeeling", {
        userId: me,
        feeling: false
      });
    }
    return;
  },
  mounted() {
    this.mood = sessionStorage.getItem("diary");
  },
  beforeDestroy() {
    this.mood = null;
  },
  middleware: "authenticated"
};
</script>

<style scoped>
#root {
  position: relative;
  margin: 0 auto;
  width: 90%;
  height: 100%;
}
#root.mobile {
  margin: 0;
  width: 90%;
}
#root.flexWrap {
  min-width: 100%;
}
#root.flexWrap.mobile {
  min-width: 100%;
}
h3 {
  display: inline;
}
small {
  font-size: 14px;
}
small.mobile {
  display: block;
}
.mood {
  background-color: transparent;
  box-sizing: border-box;
  padding: 5px;
  margin: 0 auto 0;
  border: 2px solid #333;
  width: 100%;
  height: 300px;
  resize: none;
}
.mood.mobile {
  width: 100%;
  height: 400px;
}
.quote {
  position: absolute;
  font-style: italic;
  font-size: medium;
  bottom: 2.5em;
  background-color: #fefefe;
  padding: 6px;
}
.quote.mobile {
  bottom: 5em;
}
</style>