<template>
  <div class="signWrap" :class="$mq">
    <form @submit.prevent="onSubmit" :class="$mq">
      <table class="signupForm">
        <caption>
          <h3>회원가입</h3>
        </caption>
        <tbody>
          <tr>
            <td>
              <input type="email" name="email" v-model="email" placeholder="Email" @blur="watching" />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="text"
                name="nickname"
                placeholder="Nickname"
                v-model="nickname"
                @blur="watching"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="password"
                name="password1"
                placeholder="Password"
                v-model="password"
                @blur="watching"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="password"
                name="password2"
                placeholder="Password"
                v-model="password2"
                @blur="watching"
              />
            </td>
          </tr>
          <tr>
            <td class="chk">
              <input
                type="checkbox"
                id="check"
                name="checked"
                value="개인정보수집동의"
                v-model="checked"
                @blur="watching"
              />
              <label for="check">개인정보 수집을 동의합니다.</label>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" class="signupBtn">SIGNUP</button>
    </form>
    <div id="modal-bg" :class="$mq" v-if="alarm">
      <div class="modal" :class="$mq" >
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
      email: null,
      nickname: null,
      password: null,
      password2: null,
      checked: null,
      alarm: null
    };
  },
  computed: {},
  methods: {
    setAlarm(alarmName) {
      return (this.alarm = alarmName);
    },
    watching(e) {
      if (this.onBlur(e)) {
        return true;
      } else {
        this.setAlarm(e.target.name);
      }
    },
    onChecker() {
      if (
        this.email &&
        this.nickname &&
        this.password &&
        this.password2 &&
        this.checked
      ) {
        return true;
      } else {
        return false;
      }
    },
    resetForm() {
      this.email = null;
      this.nickname = null;
      this.password = null;
      this.password2 = null;
      this.checked = null;
    },
    onSubmit(e) {
      if (this.onChecker()) {
        //빈칸이 없으면
        if (this.emailcheck()) {
          // result가 트루이면 이메일 정상
          if (this.passwordCheck()) {
            if (this.permission()) {
              const result = this.$store.dispatch("user/signup", {
                email: this.email,
                nickname: this.nickname,
                password: this.password
              });
              this.resetForm();
              if (result) {
                console.log("사인업", result);
                this.$router.push("/");
              }
            }
          } else {
            console.log("비밀번호가 일치하지 않습니다.");
          }
        }
      } else {
       return this.setAlarm('양식');
      }
    },
    onBlur(e) {
      if (e.target.value) {
        return true;
      } else {
        return false;
      }
    },
    emailcheck() {
      const at = "@";
      const domain = [
        "gmail.com",
        "naver.com",
        "daum.net",
        "kakao.com",
        "hanmail.net"
      ];
      let target;
      target = this.email.split("@"); //골뱅이도 있고
      if (target.length > 1) {
        //도메인도 포함되어있다면
        let result = domain.findIndex(v => {
          if (v === target[1]) {
            return true;
          } else {
            return false;
          }
        });
        return result + 1;
      } else {
        console.log("이메일이 잘못되었습니다.");
      }
    },
    passwordCheck() {
      return this.password === this.password2;
    },
    permission() {
      return this.checked === true;
    },
    closeModal() {
     return this.alarm = null;
    }
  },
  middleware: "anonymous"
};
</script>

<style scoped>
.signWrap{
  width: 100%;
}
form,
table.signupForm {
  /* width: 650px; */
  width: 75%;
  margin: 20px auto;
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
  width: 80%;
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
  align-items: center;
  top: -100px;
  bottom: -9px;
  left: 0;
  right: 0;
  background: rgba(112, 105, 105, 0.5);
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
  background: rgba(255, 255, 255, 1);
}
.modal header {
  text-align: end;
}
</style>