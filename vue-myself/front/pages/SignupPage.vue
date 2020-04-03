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
              <input type="email" name="email" v-model="email" placeholder="Email" />
            </td>
          </tr>
          <tr>
            <td>
              <input type="text" name="nickname" placeholder="Nickname" v-model="nickname" />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="password"
                name="password1"
                autocomplete="on"
                placeholder="Password"
                v-model="password"
              />
            </td>
          </tr>
          <tr>
            <td>
              <input
                type="password"
                name="password2"
                autocomplete="on"
                placeholder="Password"
                v-model="password2"
              />
            </td>
          </tr>
          <tr>
            <td class="chk">
              <input type="checkbox" id="check" name="checked" value="개인정보수집동의" v-model="checked" />
              <label for="check">개인정보 수집을 동의합니다.</label>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="submit" class="submitBtn">SIGNUP</button>
    </form>
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
      checked: null
    };
  },
  methods: {
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
                this.$router.push("/");
              }
            }
          } else {
            alert("비밀번호가 일치하지 않습니다.");
          }
        }
      } else {
        alert("양식을 모두 작성하세요");
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
        alert("이메일이 잘못되었습니다.");
      }
    },
    passwordCheck() {
      return this.password === this.password2;
    },
    permission() {
      return this.checked === true;
    },
    onEnter(e) {
      if (e.keyCode === 13) {
        this.onSubmit();
        e.preventDefault();
      }
      return;
    }
  },
  mounted() {
    document
      .querySelector(".signWrap")
      .addEventListener("keydown", this.onEnter, 0);
  },
  middleware: "anonymous"
};
</script>

<style scoped>
.signWrap {
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
.submitBtn {
  margin: 0 auto;
  width: 62%;
  height: 60px;
}
.submitBtn {
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
</style>