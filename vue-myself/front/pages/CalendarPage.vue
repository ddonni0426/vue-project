<template>
  <div id="cal-wrap">
    <div v-if="modal">
      <add-plan :selected="selected" @modalToggle="modalToggle"></add-plan>
    </div>
    <table id="calendar">
      <thead>
        <tr class="tab-bar">
          <td colspan="7">
            <button class="tab month current" @click.prevent="switchTab">달력</button>
            <button class="tab day" @click.prevent="switchTab">약속</button>
          </td>
        </tr>
        <!-- 가로로(td) 합치려면 colspan -->
        <tr v-if="!tab.daily" class="title-bar">
          <td v-if="!tab.daily" colspan="7">
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
          <p class="day-title">
            오늘은
            {{calInfo.month+1}}월
            {{calInfo.active}}일
            {{ days_name[calInfo.dayNum] }}요일
          </p>
        </tr>
      </thead>
      <!-- 달력 내용 -->
      <tbody>
        <template v-if="tab.monthly">
          <tr
            v-for="week in calendar"
            :key="`${week}${Math.random()}`"
            class="content month current"
          >
            <td v-for="day in week" :key="`${day}${Math.random()}`" class="month-td">
              <span v-if="day < calInfo.active" class="each-day past">{{day}}</span>
              <a
                v-else-if="day === calInfo.active"
                class="each-day today"
                @dblclick.prevent="createPlan"
              >{{day}}</a>
              <a v-else class="each-day" @dblclick.prevent="createPlan">{{day}}</a>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr class="content theday" rowspan="5">
            <td colspan="7">
              <ul class="each-day">
                <li v-for=" plan in todayPlan" :key="`${plan}${Math.random()}`" class="each-plan">
                  <p>
                    <span>{{`${plan.plan}`}}</span>
                    <span class="planInfo">{{plan.endDay.slice(5)}}-{{plan.startTime}}까지</span>
                  </p>
                </li>
              </ul>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import AddPlan from "../components/AddPlan.vue";
import { transform } from "../store/middleware.js";
export default {
  components: { AddPlan },
  data() {
    return {
      days_name: ["일", "월", "화", "수", "목", "금", "토"],
      modal: false,
      selected: { date: null, time: null },
      tab: { monthly: true, daily: false }
    };
  },
  computed: {
    calInfo() {
      return this.$store.state.calendar.calInfo;
    },
    calendar() {
      return this.$store.state.calendar.calendar;
    },
    todayPlan() {
      return this.$store.state.calendar.todayPlan;
    }
  },
  methods: {
    switchTab(e) {
      let current = document.querySelector(".current");
      if (e.target.classList.contains("current") === false) {
        current.classList.remove("current");
        e.target.classList.add("current");
        current = e.target;
        switch (current.innerText) {
          case "달력":
            this.tab.monthly = true;
            this.tab.daily = false;
            break;
          case "약속":
            this.tab.monthly = false;
            this.tab.daily = true;
            break;
          default:
            this.tab.monthly = true;
            this.tab.daily = false;
            break;
        }
      }
    },
    modalToggle() {
      return (this.modal = !this.modal);
    },
    switchMonth(e) {
      if (e.target.classList.contains("prev")) {
        this.$store.dispatch("calendar/prevMonth");
      } else {
        this.$store.dispatch("calendar/nextMonth");
      }
    },
    createPlan(e) {
      this.selected.date = `${this.calInfo.year}-0${this.calInfo.month + 1}-${
        e.target.innerText
      }`;
      let nowTime = new Date();
      let hour = transform(nowTime.getHours());
      let min = transform(nowTime.getMinutes());
      this.selected.time = `${hour}:${min}`;
      return this.modalToggle();
    }
  },
  async fetch({ store }) {
    await store.dispatch("todo/loadTodos", {
      userId: store.state.user.me.id,
      reset: true
    });
    await store.dispatch("calendar/loadCalendar", { reset: true });
    return store.dispatch("calendar/loadTodayPlan", {
      userId: store.state.user.me.id
    });
  },
  middleware: "authenticated"
};
</script>

<style scoped>
#cal-wrap {
  position: relative;
  width: 80%;
  height: 80%;
  padding: 20px;
}
#cal-wrap #calendar {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}
.day-title {
  height: 35px;
  width: 100%;
  color: #eee;
  background-color: #333;
  border: 0.5px solid #333;
}
.tab-bar {
  background: #eee;
}
tr.tab-bar > td {
  height: 45px;
}

.tab {
  display: inline-block;
  width: 100px;
  height: 45px;
  color: #333;
  font-size: 19px;
  opacity: 0.5;
}
.tab.current {
  font-size: 22px;
  color: #000;
  opacity: 1;
}
tr.title-bar {
  height: 35px;
  color: #ededed;
  font-size: 22px;
  background: #333;
  line-height: 35px;
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
  height: 30px;
}
tr.theday {
  width: 898px;
  background: #fff;
}
tr.theday ul {
  width: 100%;
}
td {
  width: 30px;
  height: 30px;
}
.month-td .each-day {
  display: inline-block;
  line-height: 80px;
  width: 100%;
}

.month-td .each-day.today {
  font-size: 1.2rem;
  font-weight: bold;
  border: 2px solid #f5a9a9;
  border-radius: 20px;
  color: #000;
}

.each-day.past {
  text-decoration: line-through;
  background-color: #fbefef;
  color: #000;
}
.each-plan {
  font-size: 16px;
  height: 50px;
  background-color: #fbefef;
}
.each-plan p {
  font-size: 18px;
  height: 50px;
  line-height: 50px;
  margin: 10px 0;
}

.each-plan p > span.planInfo {
  font-size: 15px;
}
</style>