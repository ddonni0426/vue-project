<template>
  <div id="root" :class="$mq">
    <div class="flexWrap" v-if="me" :class="$mq">
      <h3>오늘은 기분이 어때요?</h3>
      <textarea
        type="text"
        placeholder="'임금님 귀는 당나귀 귀~!!'
속시원하게 비우고 싶은 감정이 있나요?"
        v-model="mood"
        class="mood"
        @input.prevent="moodInput"
        :class="$mq"
      />
      <small>로그아웃 시 자동 삭제 됩니다.</small>
    </div>
    <!-- 회원가입  -->
    <div v-else>
      <signup-page></signup-page>
    </div>
    <!-- 오늘의 메시지 -->
    <div v-if="me">
      <vue-inspirational-quote>
        <template v-slot:default="slotProps">
          <blockquote class="blockquote quote" :class="$mq">
            &#8220;{{ slotProps.quote.body }}&#8221;
            <p>
              <small>&mdash;{{ slotProps.quote.author }}</small>
            </p>
          </blockquote>
        </template>
      </vue-inspirational-quote>
    </div>
    <!-- <div>{{saveMood}}</div> -->
    <!-- 오늘의 메시지 -->
  </div>
</template>
<script>
import SignupPage from "./SignupPage.vue";
import VueInspirationalQuote from "vue-inspirational-quote";
import debounce from "lodash.debounce";

export default {
  components: {
    SignupPage,
    VueInspirationalQuote
  },
  data() {
    return {
      tinySliderOptions: {
        mouseDrag: true,
        loop: false,
        items: 3,
        swipeAngle: 45
      },
      mood: ""
    };
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    }
  },
  methods: {
    saveMood() {
      console.log("saveMood");
      if (this.$store.state.post.saveMood) {
        this.mood = this.$store.state.post.saveMood;
        return this.mood;
      }
    },
    moodInput: debounce(async function() {
      console.log("인풋action 실행");
      try {
        await this.$store.dispatch("post/setMood", { mood: this.mood });
        this.saveMood();
        console.log("실행");
      } catch (error) {
        console.log(error);
      }
      return;
    }, 3000)
  },
  async fetch({ store }) {
    await store.dispatch("todo/loadTodos", {
      userId: store.state.user.me.id,
      reset: true
    });
    return;
  },
  mounted() {
    console.log("마운트", this.saveMood());
  },
  middleware: "authenticated"
};
</script>

<style scoped>
/* 포스트잇 CSS */
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
.mood {
  box-sizing: border-box;
  padding: 5px;
  margin: 1em auto 0;
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