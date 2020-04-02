import { InitCalendar, MakeCalendar, getWeekth, monthsTable, transform } from './middleware';
InitCalendar.Page = new Date().getMonth();

export const state = () => ({
  first: '', //첫날 요일
  calendar: [], //1~31
  calInfo: {
    year: null, month: null, dayNum: null, active: null, weekth: null
  },
  weekPlans: [],
  todayPlan: [],
});
//뮤테이션 시작
export const mutations = {
  loadCalendar(state, payload) {
    state.first = payload.init.first;
    state.calendar = payload.calendar;
    state.calInfo.year = payload.init.year;
    state.calInfo.month = payload.init.monId;
    state.calInfo.dayNum = payload.today.getDay();
    state.calInfo.active = payload.today.getDate();
    state.calInfo.weekth = payload.weekth;
    return;
  },
  loadWeekPlan(state, payload) {
    state.weekPlans = payload.map(e => ({
      startY: e.startDay.split('-')[0],
      startM: e.startDay.split('-')[1],
      startD: e.startDay.split('-')[2],
      EndY: e.endDay.split('-')[0],
      EndM: e.endDay.split('-')[1],
      EndD: e.endDay.split('-')[2],
      startT: e.startTime,
      EndT: e.endTime,
      plan: e.plan
    })
    );
  },
  loadTodayPlan(state, payload) {
    return state.todayPlan = payload;
  }
};
//액션 시작
export const actions = {
  loadCalendar({ commit }, payload) {
    if (payload.reset) {
      const today = new Date();
      const init = new InitCalendar(today);
      let calendar = new MakeCalendar(init.monId, init.first, monthsTable);
      let final_table = calendar.matrix(calendar.setFrame());
      const weekth = getWeekth(today, final_table);
      return commit('loadCalendar', { calendar: final_table, today, init, weekth });
    } else { }
  },
  prevMonth({ commit }, payload) {
    try {
      const today = new Date();
      let prev = InitCalendar.prevMonth();
      let prevCal = new MakeCalendar(prev.monId, prev.first, monthsTable);
      let prev_table = prevCal.matrix(prevCal.setFrame());
      const weekth = getWeekth(today, prev_table);
      return commit('loadCalendar', { calendar: prev_table, today, init: prev, weekth });
    } catch (error) {
      console.error(error);
    }
  },
  nextMonth({ commit }) {
    try {
      const today = new Date();
      let next = InitCalendar.nextMonth();
      let nextCal = new MakeCalendar(next.monId, next.first, monthsTable);
      let next_table = nextCal.matrix(nextCal.setFrame());
      const weekth = getWeekth(today, next_table);
      return commit('loadCalendar', { calendar: next_table, today, init: next, weekth });
    } catch (error) {
      console.error(error);
    }
  },
  async loadWeekPlan({ state, commit }, payload) {
    try {
      const res = await this.$axios.post(`/plans/weeks`, {
        userId: payload.userId,
        year: state.calInfo.year,
        month: transform(state.calInfo.month + 1),
        day: transform(state.calInfo.active),
        first: payload.first
      }, { withCredentials: true });
      commit('loadWeekPlan', res.data);
    } catch (error) {
      console.error(error);
    }
  },
  async loadTodayPlan({ state, commit }, payload) {
    try {
      const res = await this.$axios.post(`/plans/today`, {
        userId: payload.userId,
        year: state.calInfo.year,
        month: state.calInfo.month,
        day: state.calInfo.active,
      }, { withCredentials: true });
      commit('loadTodayPlan', res.data);
    } catch (error) {
      console.error(error);
    }
  },
  async addPlan({ commit, dispatch }, payload) {
    try {
      const res = await this.$axios.post('/plan/add', {
        userId: payload.userId,
        startD: payload.startD,
        stratT: payload.startT,
        endD: payload.endD,
        endT: payload.endT,
        plan: payload.plan
      }, { withCredentials: true });
      dispatch('loadTodayPlan', {});
      commit('addPlan', res.data);
    } catch (error) {
      console.error(error);
    }
  },
  async removePlan() {
    try {
      await this.$axios.delete(`/plan?userId=${payload.userId}`, { withCredentials: true })
    } catch (error) {
      console.error(error);
    }
  },
};