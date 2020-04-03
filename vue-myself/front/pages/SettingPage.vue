<template>
  <div class="settingWrap" :class="$mq" >
    <form @submit.prevent="onSubmit" :class="$mq">
      <table class="settingForm">
        <caption>
          <h3>회원정보 변경</h3>
        </caption>
        <tbody>
          <tr>
            <td>
              <input type="text" name="newNick" autocomplete="on" :placeholder="`현재 닉네임:${oldNick}`" v-model="newNick" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="password" name="password1" autocomplete="current-password" placeholder="현재 비밀번호" v-model="password" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="password" name="password2" autocomplete="new-password" placeholder="새 비밀번호" v-model="password2" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="password" name="password3" autocomplete="new-password" placeholder="새 비밀번호" v-model="password3" />
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" class="signupBtn">Modify</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newNick:null,
      password: null,
      password2: null,
      password3: null,
    };
  },
  computed: {
    oldNick(){
      return this.$store.state.user.me.nickname;
    }
  },
  methods: {
    isFilled() {
      if(this.newNick === null){
        this.newNick = this.oldNick
      }
      if (this.password && this.password2 && this.password3) {
        return true;
      } else {
        return false;
      }
    },
    resetForm() {
      this.newNick = null;
      this.password = null;
      this.password2 = null;
      this.password3 = null;
    },
    async onSubmit(e) {
      if (this.isFilled()) {
        if (this.passwordCheck()) {
          await this.$store.dispatch("user/modify", {
            userId: this.$store.state.user.me.id,
            newNick:this.newNick,
            oldPass: this.password,
            newPass: this.password2
          });
          this.resetForm();
        }
      } else {
        debugger ;
      }
    },
    passwordCheck() {
      return this.password2 === this.password3;
    },
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