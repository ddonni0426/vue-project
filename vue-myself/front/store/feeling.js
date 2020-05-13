export const state = () => ({
  feeling: [],
});

export const mutations = {
  getfeeling(state, payload) {
    state.feeling = payload;
    return
  },
  addfeeling(state, payload) {
    return state.feeling = payload
  }
};

export const actions = {
  async getfeeling({ commit, state }, payload) {
    try {
      const res = await this.$axios.get(`/feelings?userId=${payload.userId}`, { withCredentials: true });
      commit('getfeeling', res.data);
    } catch (error) {
      console.error(error);
    }
  },
  async addfeeling({ commit, state }, payload) {
    try {
      const res = await this.$axios.patch(`/feeling/${payload.feeling}`, {
        score: state.feeling[`${payload.feeling}`],
        userId: payload.userId
      }, { withCredentials: true });
      commit('addfeeling', res.data);
    } catch (error) {
      console.error(error);
    }
  }
};