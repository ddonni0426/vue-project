<template>
  <section class="textCard" :class="$mq">
    <textarea class="memo" :class="$mq" placeholder="메모를 입력하세요" v-model="content" />
    <button @click.prevent="addPost">
      <i class="far fa-plus-square"></i>
    </button>
  </section>
</template>
<script>
export default {
  computed: {
    me() {
      return this.$store.state.user.me;
    }
  },
  data() {
    return {
      content: ""
    };
  },
  methods: {
    resetForm() {
      this.content = "";
    },
    addPost() {
      if (this.content === "") {
        this.$router.push("/errors/notNull");
        return;
      }
      const result = this.$store.dispatch("post/addPost", {
        content: this.content
      });
      this.resetForm();
    },
    isEnter(e) {
      if (e.keyCode === 13) {
        return "\r\n";
      }
    }
  }
};
</script>
<style scoped>
.textCard {
  margin: 0 12.8px 20px;
}
.memo.mobile,.memo.tablet {
  width: 98%;
}
.memo {
  width: 457px;
  height: 120px;
  resize: none;
  font-size: 18px;
  border: 2px solid #333;
}
i.far {
  font-size: 1.3em;
  color: #333;
}
.alert {
  border: 1px solid red;
  color: red;
}
</style>