<template>
  <ul class="todoWrap">
    <div class="container">
      <li v-for="todo in todos" :key="todo.id" class="item">
        <span @change="onFinish" class="todo-elem">
          <input type="checkbox" :id="todo.id" :checked="todo.finish" />
          <label :for="todo.id">{{todo.content}}</label>
        </span>
        <button @click="deleteTodo(todo)" class="delTodo">
          <i class="fas fa-times"></i>
        </button>
      </li>
    </div>
  </ul>
</template>

<script>
export default {
  data() {
    return { };
  },
  computed: {
    todos() {
      return this.$store.state.todo.todo;
    },
  },
  methods: {
    onFinish(e) {
      this.$store.dispatch("todo/finishTodo", {
        id: e.target.getAttribute("id"),
        checked: e.target.checked
      });
    },
    deleteTodo(todo) {
      return this.$store.dispatch("todo/deleteTodo", {
        id: todo.id,
        UserId: this.$store.state.user.me.id
      });
    }
  }
};
</script>

<style scoped>
.todoWrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container {
  width: 260px;
  padding: 15px 0 0 0;
}
input[type="checkbox"] {
  width: 15px;
  height: 15px;
}
label {
  margin: 0 10px;
}
input[type="checkbox"]:checked + label {
  text-decoration: line-through;
}
input[type="button"] {
  width: 15px;
  height: 15px;
}
.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
span.todo-elem{
width: 240px;
  padding: 3px 0;
}
.delTodo {
  padding-left: 9px;
  font-size: 16px;
}
</style>