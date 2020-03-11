<template>
  <div class="settingWrap" :class="$mq" >
    <form @submit.prevent="onSubmit" :class="$mq">
      <table class="settingForm">
        <caption>
          <h3>비밀번호 변경</h3>
        </caption>
        <tbody>
          <tr>
            <td>
              <input type="password" name="password1" placeholder="현재 비밀번호" v-model="password" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="password" name="password2" placeholder="새 비밀번호" v-model="password2" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="password" name="password3" placeholder="새 비밀번호" v-model="password3" />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" class="signupBtn">Modify</button>
    </form>
    <div id="modal-bg" :class="$mq" v-if="alarm">
      <div class="modal" :class="$mq">
        <section>{{alarm}}을 다시 확인해 주세요</section>
        <button @click="closeModal">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: null,
      password2: null,
      password3: null,
      alarm: null
    };
  },
  computed: {},
  methods: {
    setAlarm(alarmName) {
      return (this.alarm = alarmName);
    },
    isFilled() {
      if (this.password && this.password2 && this.password3) {
        return true;
      } else {
        return false;
      }
    },
    resetForm() {
      this.password = null;
      this.password2 = null;
      this.password3 = null;
    },
    onSubmit(e) {
      if (this.isFilled()) {
        if (this.passwordCheck()) {
          this.$store.dispatch("user/modify", {
            userId: this.$store.state.user.me.id,
            oldPass: this.password,
            newPass: this.password2
          });
        }
      } else {
        return this.setAlarm("양식");
      }
    },
    passwordCheck() {
      return this.password2 === this.password3;
    },
    closeModal() {
      return (this.alarm = null);
    }
  },
  middleware: "authenticated" //로그인 한 사람만 접근가능
};
</script>

<style scoped>
.settingWrap{
  width: 100%;
}
form,
table.settingForm {
  width: 75%;
  margin: 20px auto;
  text-align: center;
}
form.tablet,
form.mobile {
  margin: 10px auto;
  width: 95%;
  text-align: center; 
}
h3 {
  font-size: 22px;
  font-weight: normal;
}
input[type="email"],
input[type="text"],
input[type="password"] {
  width: 80%;
  height: 60px;
  margin-bottom: 10px;
  border: none;
  border-bottom: 2px solid #333;
  padding: 0 10px;
}
.chk,
.signupBtn {
  margin: 0 auto;
  width: 65%;
  height: 60px;
}
.signupBtn {
  text-align: center;
  background-color: #333;
  color: azure;
  border: none;
  cursor: pointer;
}
.redBox {
  display: block;
  border: 1px solid red;
  color: red;
}
.hidden {
  display: none;
}
input[type="password"] {
  font-family: "NanumSquare";
}
input::placeholder {
  font-family: "NanumSquare";
}
#modal-bg {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  /* background: rgba(112, 105, 105, 0.5); */
}
.modal {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;
  box-sizing: border-box;
  width: 500px;
  height: 170px;
  border: 2px solid black;
  background: rgba(255, 255, 255, 1);
}
.modal.mobile {
  width: 75%;
}
.modal header {
  text-align: end;
}
</style>