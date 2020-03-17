<template>
  <div id="cal-wrap">
    <div v-if="modal">
      <add-plan :selected="selected" @modalToggle="modalToggle"></add-plan>
    </div>
    <table id="calendar">
      <thead>
        <tr class="tab-bar">
          <td colspan="7">
            <button class="tab month current" @click.prevent="switchTab">월별</button>
            <button class="tab day" @click.prevent="switchTab">일별</button>
          </td>
        </tr>
        <!-- 가로로(td) 합치려면 colspan -->
        <tr class="title-bar">
          <td colspan="7">
            <a class="prev" @click.prevent="prevMonth">
              <i class="fas fa-angle-left"></i>
            </a>
            <span>{{cal.year}}년</span>
            <span>{{cal.month+1}}월</span>
            <span>{{cal.active}}일</span>
            <a class="next" @click.prevent="nextMonth">
              <i class="fas fa-angle-right"></i>
            </a>
          </td>
        </tr>
        <tr class="sub-bar" v-if="tab.monthly">
          <td v-for="day in days_name" :key="`${day}${Math.random()}`">{{day}}</td>
        </tr>
        <tr v-else>
          <p class="day-title">{{ days_name[cal.nowfull] }}요일</p>
        </tr>
      </thead>
      <tbody>
        <template v-if="tab.monthly">
          <tr v-for="week in matrix" :key="`${week}${Math.random()}`" class="content month current">
            <td v-for="day in week" :key="`${day}${Math.random()}`" class="month-td">
              <span v-if="day < cal.active" class="each-day past">{{day}}</span>
              <a v-else class="each-day" @dblclick.prevent="createPlan">{{day}}</a>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr class="content theday" rowspan="5">
            <td colspan="7">
              <ul class="each-day">
                <li v-for=" plan in plans" :key="`${plan}${Math.random()}`" class="each-plan">
                  <p>{{`${plan.hour}:${plan.min} ${plan.title}`}}</p>
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
export default {
  components: {
    AddPlan
  },
  data() {
    return {
      days_name: ["일", "월", "화", "수", "목", "금", "토"],
      modal: false,
      selected: { date: null, time: null },
      tab: { monthly: true, daily: false }
    };
  },
  computed: {
    cal() {
      return this.$store.state.calendar.cal;
    },
    matrix() {
      return this.$store.state.calendar.matrix;
    },
    plans() {
      return this.$store.state.calendar.plans;
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
          case "월별":
            this.tab.monthly = true;
            this.tab.daily = false;
            break;
          case "일별":
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
    async prevMonth() {
      await this.$store.dispatch("calendar/addPlan", {
        prev: this.cal.month - 1
      });
    },
    createPlan(e) {
      this.selected.date = `${this.cal.year}-0${this.cal.month + 1}-${
        e.target.innerText
      }`;
      let nowTime = new Date();
      let hour =
        nowTime.getHours().toString().length === 1
          ? `0${nowTime.getHours()}`
          : `${nowTime.getHours()}`;
      let min =
        nowTime.getMinutes().toString().length === 1
          ? `0${nowTime.getMinutes()}`
          : `${nowTime.getMinutes()}`;
      this.selected.time = `${hour}:${min}`;
      return this.modalToggle();
    }
  },
  fetch({ store }) {
    return store.dispatch("calendar/loadPlan", { reset: true });
  }
};
</script>

<style scoped>
.month-td > .each-day:nth-child(17) {
  background-color: pink;
}
#cal-wrap {
  position: relative;
  width: 90%;
  height: 80%;
  /* background: #ededed; */
  padding: 20px;
}
#cal-wrap #calendar {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: 0 auto;
  border: 1px solid #333;
}
.day-title {
  height: 100%;
  width: 100%;
  color: #eee;
  background-color: #333;
  border: 0.5px solid #333;
}
.tab-bar {
  background: #eee;
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
.title-bar {
  height: 55px;
  line-height: 22px;
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
.sub-bar td:first-child {
  color: red;
}
.sub-bar td:last-child {
  color: dodgerblue;
}
/* Transition 연구좀 하자  */
tbody tr.content {
  transition: 0.5s ease-out;
}
tr {
  border-top: 1px solid #333;
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
  border: 1px solid #333;
}
.each-day {
  display: inline-block;
  line-height: 50px;
  width: 100%;
  height: 100%;
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
  /* border-bottom: 2px solid #f5a9a9; */
}
.each-plan p {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  margin: 10px 0;
}
</style>