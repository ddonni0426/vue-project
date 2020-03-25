<template>
  <!-- 주간 달력 -->
  <table class="weekly">
    <thead class="week-header">
      <tr class="title-bar">
        <td colspan="7">
          <span>{{calInfo.year}}년</span>
          <span>{{calInfo.month+1}}월</span>
          <span>{{calInfo.weekth}}주차</span>
          <span>{{calInfo.active}}일</span>
        </td>
      </tr>
      <tr class="sub-bar">
        <td v-for="day in days_name" :key="`${day.num}${Math.random()}`">{{day.val}}</td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td v-for="(day, i) in days_name" :key="`${i}${Math.random()}`" class="each-day">
          <p>{{calendar[`${calInfo.weekth}주차`][i] }}</p>
          <p v-if="weeklyPlan" class="each-plan">{{}}</p>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 주간 달력 -->
</template>

<script>
export default {
  props: {
    calInfo: { type: Object, required: true }
  },
  data() {
    return {
      days_name: [
        { id: "sun", num: 0, val: "일" },
        { id: "mon", num: 1, val: "월" },
        { id: "tue", num: 2, val: "화" },
        { id: "wed", num: 3, val: "수" },
        { id: "thu", num: 4, val: "목" },
        { id: "fri", num: 5, val: "금" },
        { id: "sat", num: 6, val: "토" }
      ]
    };
  },
  computed: {
    calendar() {
      return this.$store.state.calendar.calendar;
    },
    weeklyPlan(){
      return this.$store.state.calendar.weekPlans;
    }
  },
  mounted() {
    const today = new Date().getDay();
    const target = document.querySelectorAll(".sub-bar td");
    let ch_bg = document.querySelector(".each-day");
    for (let i of target) {
      console.log();
      if (i.innerText === this.days_name[today].val) {
        i.classList.add("today");
      }
    }
  }
};
</script>

<style scoped>
.weekly {
  margin: 0 auto;
  border: 1px solid #dedede;
  width: 90%;
  height: 400px;
  text-align: center;
}
.title-bar {
  height: 50px;
  background: #333;
  color: #dedede;
}
.sub-bar {
  height: 40px;
  border-bottom: 1px solid #dedede;
  /* border-right: 1px solid #dedede; */
}
.today {
  border: 2px solid #f5a9a9;
  background: #fbefef;
}
td.each-day {
  border-right: 1px solid #dedede;
  vertical-align: top;
  padding: 9px 0;
  overflow-y: auto;
  white-space: normal;
  text-overflow: ellipsis;
}
td > p.each-plan {
  /* background: #fbefef; */
  opacity: 0.8;
  height: 26px;
  line-height: 26px;
  border-top: 0.5px solid #f5a9a9;
  border-bottom: 0.5px solid #f5a9a9;
}
</style>