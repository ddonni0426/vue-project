import { initCalendar, makeCalendar } from './middleware';
const today = new Date();

export const state = () => ({
  first: '', //첫날 요일
  matrix: [], //1~31
  cal: { year: null, month: null, nowfull: null, active: null },
  plans: [
    { title: '나희랑 점심', hour: 14, min: 55 },
  ],
});

//뮤테이션 시작
export const mutations = {
  loadPlan(state, payload) {
    state.cal.nowfull = today.getDay();
    state.first = payload.init.first;
    state.cal.month = payload.init.modId;
    state.cal.year = payload.init.year;
    state.cal.active = today.getDate();
    state.matrix = payload.matrix;
    return;
  }
};

//액션 시작
export const actions = {
  loadPlan({ commit }, payload) {
    if (payload.reset) {
      console.log('실행')
      const init = initCalendar(today);
      const matrix = makeCalendar(init.modId, init.first);
      return commit('loadPlan', { matrix, init });
    } else {
      
    }
  },

  async addPlan({ commit }, payload) {
    try {
      const res = await this.$axios.post('/plan', {}, { withCredentials: true });
      commit('addPlan', res);
    } catch (error) {
      console.error(error);
    }
  },

  async removePlan() {
    try {
      await this.$axios.delete('/plan', { withCredentials: true })
    } catch (error) {
      console.error(error);
    }
  },
};