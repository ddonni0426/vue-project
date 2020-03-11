<template>
  <div class="todo" :class="$mq">
    <h2>
      <strong>TODO LIST</strong>
    </h2>
    <div class="add">
      <input
        type="text"
        class="inputBox"
        maxlength="15"
        placeholder="할 일을 입력해 주세요."
        v-model="content"
      />
      <a href="#" @click.prevent="addTodo">
        <i class="fas fa-plus-square"></i>
      </a>
    </div>
    <todo-form class="list" v-if="todo.length"></todo-form>
  </div>
</template>

<script>
import TodoForm from "./TodoForm.vue";
export default {
  components: {
    TodoForm
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
    todo() {
      return this.$store.state.todo.todo;
    },
    me() {
      return this.$store.state.user.me;
    }
  },
  methods: {
    resetForm() {
      const inputBox = document.querySelector(".inputBox");
      inputBox.classList.remove("alert");
      this.content = "";
      inputBox.setAttribute("placeholder", "할 일을 입력해 주세요.");
    },
    onAlert() {
      const inputBox = document.querySelector(".inputBox");
      inputBox.classList.add("alert");
      inputBox.setAttribute("placeholder", "내용을 입력하세요!!");
    },
    async addTodo() {
      if (this.content === "") {
        return this.onAlert();
      }
      await this.$store.dispatch("todo/add", {
        content: this.content,
        userId: this.me.id
      });
      this.resetForm();
    }
  },
    created(){
    
  }
};
</script>

<style scoped>

h2 {
  text-align: center;
}
.add {
  text-align: center;
}
.add input {
  width: 200px;
  height: 50px;
  padding-right: 15px;
  border-bottom: 1px solid black;
}
.add a i {
  font-size: 1.3em;
  color: #333333;
  vertical-align: middle;
}
.alert {
  outline: red;
}
.alert::placeholder {
  color: red;
}
</style>