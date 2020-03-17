<template>
  <transition>
    <div id="bg-modal" :class="$mq">
      <form @submit.prevent id="modalForm" :class="$mq">
        <header>
          <span>일정추가</span>
        </header>
        <main class="modal-body">
          <div class="setperiod">
            <div>
              <label>시작</label>
              <input type="date" :value="selected.date" :min="selected.date" class="start date" />
              <input type="time" :value="selected.time" class="start time" />
            </div>
            <div>
              <label>종료</label>
              <input type="date" :value="endD" :min="selected.date" max="zzz" class="end date" />
              <input type="time" :value="endT"  class="end time" />
            </div>
          </div>
          <textarea id="plan" cols="20" placeholder="일정을 입력하세요" v-model="title" />
        </main>
        <footer>
          <input type="submit" value="추가" />
          <input type="button" @click.prevent="close" value="닫기" />
        </footer>
      </form>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    selected: { type: Object, required: true }
  },
  data() {
    return {
      endD:'',
      endT:'',
      title: "",
    };
  },
  conputed: {},
  methods: {
    close() {
      this.$emit("modalToggle");
    }
  },
  addPlan() {
    this.$store.dispatch("calendar/addPlan", {
      startD: this.start_date,
      stratT: this.start_time,
      endD: this.end_date,
      endT: this.end_time,
      plan: this.plan
    });
  },
  mounted() {
    console.log(this.selected.date);
  }
};
</script>

<style scoped>
#bg-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
#bg-modal.mobile {
  width: 100%;
}
#modalForm {
  position: absolute;
  width: 500px;
  height: 270px;
  background: #fff;
  border: 2px solid #333;
  border-radius: 10px;
}
#modalForm.mobile {
  width: 90%;
  height: 50%;
  text-align: center;
}
/* #modalForm.mobile input[type="date"] {
} */
input[type="date"] {
  background: #fbefef;
}
header,
footer {
  position: absolute;
  display: block;
  height: 20px;
}
header {
  top: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  background: #333;
}
main {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  top: 50px;
}
footer {
  width: 100%;
  bottom: 10px;
  height: 40px;
  text-align: center;
}
.setperiod {
  display: inline-block;
  text-align: center;
}
input[type="submit"] {
  border: 1px solid #333;
  border-radius: 7px;
  padding: 7px;
  margin: 0 3.5px;
}
input[type="button"] {
  border-radius: 7px;
  padding: 7px;
  margin: 0 3.5px;
  background: #333;
  color: #fff;
}
#plan {
  width: 90%;
  height: 60px;
  margin: 20px 0;
  text-align: center;
  vertical-align: middle;
  resize: none;
}
</style>