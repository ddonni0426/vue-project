export const state = () => ({
  todo: [],
  finish: false
});

////////////////mutations 시작
export const mutations = {

  loadTodos(state, payload) {
    if (payload && payload.reset) { //리셋 또는 최초 로딩시
      return state.todo = payload.data;
    } else { // 게시물  
      return state.todo = state.todo.concat(payload.data);
    }
  },

  add(state, payload) {
    return state.todo.unshift(payload);
  },

  deleteTodo(state, payload) {
    const index = state.todo.findIndex(v => v.id === payload.id);
    state.todo.splice(index, 1);
    return;
  },

  finishTodo(state, payload) {
    const index = state.todo.findIndex(v =>
      v.id === parseInt(payload.id, 10));
    return state.todo[index].finish = payload.checked;
  }
};

////////////////actions 시작
export const actions = {
  //투두 로드
  async loadTodos({ commit }, payload) {
    try {
      const res = await this.$axios.get(`/todos/${payload.userId}`, {
        withCredentials: true
      });
      if (payload && payload.reset) {
        return commit('loadTodos', { data: res.data, reset: true });
      }
      return commit('loadTodos', { data: res.data });
    } catch (error) {
      console.error(error);
    }
  },
//추가
  async add({ commit }, payload) {
    try {
      const res = await this.$axios.post('/todo', { content: payload.content, userId: payload.userId }, {
        withCredentials: true
      });
      commit('add', res.data);
    } catch (error) {
      console.error(error);
    }
  },
//삭제
  async deleteTodo({ commit }, payload) {
    try {
      await this.$axios.delete(`/todo/${payload.id}`, {
        withCredentials: true
      });
      commit('deleteTodo', payload);
    } catch (error) {
      console.error(error);
    }
  },
//완료여부
  async finishTodo({ commit }, payload) {
    try {
      //투두 아이디, 체크여부
      await this.$axios.patch('/todo', { id: payload.id, isFinish: payload.checked }, {
        withCredentials: true
      });
      commit('finishTodo', payload);
      return;
    } catch (error) {
      console.error(error);
    }
  }
};