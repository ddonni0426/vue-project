<template>
  <transition>
    <div id="bg-modal" :class="$mq">
      <form @submit.prevent="addPlan" id="modalForm" :class="$mq">
        <header>
          <span>일정추가</span>
        </header>
        <main class="modal-body">
          <div class="setperiod">
            <div>
              <label>시작</label>
              <input type="date" v-model="startD" :min="selected.date" class="start date" />
              <input type="time" v-model="startT" class="start time" />
            </div>
            <!-- 종료 -->
            <div>
              <label>종료</label>
              <input type="date" v-model="endD" :min="selected.date" max="zzz" class="end date" />
              <input type="time" v-model="endT" class="end time" />
            </div>
            <!-- 종료 -->
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
      startD: this.selected.date,
      startT: this.selected.time,
      endD: null,
      endT: null,
      title: null
    };
  },
  methods: {
    close() {
      this.$emit("modalToggle");
    },
    isFilled() {
      return this.startD && this.startT && this.endD && this.endT;
    },
    isThisWeek(){
      const check = new Date();
      this.startD === check.getDay();
    },
    async addPlan() {
      let chk = this.isFilled();
      if (chk) {
        await this.$store.dispatch("calendar/addPlan", {
          userId: this.$store.state.user.me.id,
          startD: this.startD,
          startT: this.startT,
          endD: this.endD,
          endT: this.endT,
          plan: this.title
        }, { root: true });
        this.close();
      } else {
        const txt = document.getElementById("plan");
        this.title = "";
        txt.style.outlineColor = 'red';
        txt.focus();
        txt.setAttribute("placeholder", "양식을 모두 작성해 주세요!");
      }
    }
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