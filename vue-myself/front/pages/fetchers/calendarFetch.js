export default {
  async calendarFetch({ store }) {
    await store.dispatch("calendar/loadCalendar", {
      userId: store.state.user.me.id,
      reset: true
    });
  },
};