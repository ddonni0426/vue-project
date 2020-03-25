<template>
  <table id="calendar">
    <thead>
      <slot name="table-tab">
        <!-- 달력 vs 일정 탭 -->
      </slot>
      <!-- 가로로(td) 합치려면 colspan -->
      <tr class="title-bar">
        <td colspan="7">
          <a class="prev" @click.prevent="switchMonth">
            <i class="fas fa-angle-left prev"></i>
          </a>
          <span>{{calInfo.year}}년</span>
          <span>{{calInfo.month+1}}월</span>
          <span>{{calInfo.weekth}}주차</span>
          <span>{{calInfo.active}}일</span>
          <a class="next" @click.prevent="switchMonth">
            <i class="fas fa-angle-right next"></i>
          </a>
        </td>
      </tr>
      <tr class="sub-bar" v-if="tab.monthly">
        <td v-for="day in days_name" :key="`${day}${Math.random()}`">{{day}}</td>
      </tr>
      <tr v-else>
        <p class="day-title">오늘은 {{ days_name[calInfo.dayNum] }}요일</p>
      </tr>
    </thead>
    <!-- tbody시작 -->
    <tbody>
      <slot name="table-body">
        <!-- 달력 내용 -->
      </slot>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      days_name: ["일", "월", "화", "수", "목", "금", "토"],
      tab: { monthly: true, daily: false }
    };
  },
  computed: {
    calInfo() {
      return this.$store.state.calendar.calInfo;
    },
},
methods:{
    switchMonth(e) {
      if (e.target.classList.contains("prev")) {
        this.$store.dispatch("calendar/prevMonth");
      } else {
        this.$store.dispatch("calendar/nextMonth");
      }
    },
}
};
</script>

<style scoped>
.title-bar {
  height: 55px;
  color: #ededed;
  font-size: 22px;
  background: #333;
}
.title-bar a.prev,
.title-bar a.next {
  margin: 0 5px;
  vertical-align: middle;
  font-size: 22px;
}
.sub-bar > td {
  height: 35px;
  line-height: 35px;
  border: none;
}
.sub-bar p.day-title {
  height: 40px;
  line-height: 40px;
}
.sub-bar td:first-child {
  color: red;
}
.sub-bar td:last-child {
  color: dodgerblue;
}
tr {
  /* border-top: 1px solid #333; */
  height: 30px;
}
</style>