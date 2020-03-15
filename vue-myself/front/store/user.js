
export const state = () => ({
  me: null,
  other: null,
});

////////////////mutations 시작
export const mutations = {
  setMe(state, payload) {
    return state.me = payload;
  },
  removeMe(state) {
    return state.me = null;
  },
};

////////////////actions 시작
export const actions = {
  async loadUser({ state, commit }) {
    try {
      const res = await this.$axios.get('/user', { withCredentials: true });
      commit('setMe', res.data);

    } catch (err) {
      console.log(err);
    }
  },
  async setMe({ commit }, payload) {
    try {
      const res = await this.$axios.get('/user', { withCredentials: true });
      commit('setMe', res.data);
      return;
    } catch (err) {
      console.error(err);
    }
  },
  async signup({ commit, redirect }, payload) {
    try {
      await this.$axios.post('/user/signup', {
        email: payload.email, nickname: payload.nickname, password: payload.password,
      });
      this.$router.push('/');
    } catch (err) {
      console.error(err);
    }
  },
  async login({ commit, dispatch, state }, payload) {
    try {
      const res = await this.$axios.post('/user/login', {
        email: payload.email,
        password: payload.password
      }, { withCredentials: true });
      await commit('setMe', res.data);
      await dispatch('todo/loadTodos', { userId: state.me.id, reset: true }, { root: true });
      this.$router.push('/');
      return;
    } catch (error) {
      console.error(error);
    }
  },
  async logout({ commit }) {
    try {
      await this.$axios.post('/user/logout', {}, { withCredentials: true });
      commit('removeMe', null);
      this.$router.push('/');
      return;
    } catch (error) {
      console.error(error);
    }
  },
  async modify({ commit }, payload) {
    try {
      const res = await this.$axios.patch('/user/modify', {
        userId: payload.userId,
        newNick: payload.newNick,
        oldPass: payload.oldPass,
        newPass: payload.newPass
      },
        { withCredentials: true });
      commit('setMe', res.data);
      return;
    } catch (error) {
      console.error(error);
    }
  },
};