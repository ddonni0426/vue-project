<template>
  <div id="calender">
    <input type="text" />
    <vue-cal
      :time="false"
      class="vuecal--pink-theme cal"
      :events="events"
      :class="$mq"
      :time-from="8 * 60"
      :time-to="17 * 60"
      :disable-views="['years', 'year']"
      @ready="fetchEvents"
      @view-change="fetchEvents"
    />
  </div>
</template>
<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
export default {
  components: {
    VueCal
  },
  data() {
    return {};
  },
  computed: {
    events() {
      return this.$store.state.calender.events;
    }
  },
  methods: {
    fetchEvents({ view, startDate, endDate, week }) {
      console.log("Fetching events", { view, startDate, endDate, week });
      // Do an ajax call here with the given startDate & endDate.
      // Your API should return an array of events for this date range.
      // Here we pretend an API call with a Promise and the setTimeout simulates the payload time.
      new Promise((resolve, reject) => {
        setTimeout(resolve, 400);
      }).then(() => {
        switch (view) {
          case "week":
            // If week view return the current week from API.
            this.events = events[week];
            break;
          case "month":
          case "day":
            // If `month` or `day` view, return all the events from API.
            // (But your API should rather return events only for the given date range)
            this.events = [...events[44], ...events[45], ...events[46]];
            break;
        }
      });
    }
  }
};
</script>

<style scoped>
#calender {
  width: 90%;
}
#calender .cal {
  height: 500px;
}
#calender .cal.mobile,
#calender .cal.tablet {
  width: 80%;
  margin-bottom: 80px;
}
</style>