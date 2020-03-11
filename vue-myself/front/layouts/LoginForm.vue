<template>
  <div id="login-container" :class="$mq">
    <div class="login-inner" :class="$mq" v-if="!me">
      <input type="email" class="email" :class="$mq" placeholder="이메일" v-model="email" />
      <input type="password" class="password" :class="$mq" placeholder="패스워드" v-model="password" />
      <input type="button" class="login" :class="$mq" value="로그인" @click="onLogin" />
      <button class="login" :class="$mq" @click="onLogin">
        <i class="fas fa-sign-in-alt" :class="$mq"></i>
      </button>
    </div>

    <div v-else class="profile" :class="$mq">
      <p :class="$mq">{{me.nickname}} 님</p>
      <input type="button" value="로그아웃" @click.prevent="logout" class="logout" :class="$mq" />
      <button class="logout" :class="$mq" @click.prevent="logout">
        <i class="fas fa-power-off" :class="$mq"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    me() {
      return this.$store.state.user.me;
    }
  },
  methods: {
    onLogin() {
      //로그인 요청
      return this.$store.dispatch("user/login", {
        email: this.email,
        password: this.password
      });
    },
    onSignup() {
      this.$router.push("/signup");
    },
    async logout() {
      try {
        const res = await this.$store.dispatch("user/logout", {});
        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
#login-container .login-inner input {
  box-sizing: border-box;
  margin-right: 10px;
  border: none;
}
#login-container.mobile{
  width: 100%;
}
#login-container > .login-inner > input.password,
#login-container > .login-inner > input.email {
  width: 160px;
  height: 30px;
  color: #fff;
  background-color: transparent;
  border-bottom: 1px solid #fff;
}
#login-container > .login-inner.mobile {
  width: 100%; 
  text-align: center;
}
#login-container > .login-inner.mobile > input.password,
#login-container > .login-inner.mobile > input.email{
  width: 30%;
  font-size: 0.9rem;
}

#login-container .login-inner > input[type="button"] {
  width: 80px;
  height: 30px;
  border: 1px solid darkgray;
  border-radius: 10px;
}
#login-container .login-inner > input.password {
  font-family: "NanumSquare";
}
#login-container .login-inner > input::placeholder {
  font-family: "NanumSquare";
}
/* input box color */
input:-webkit-autofill {
  /* -webkit-box-shadow: 0 0 0 30px transparent inset; */
  -webkit-text-fill-color: #fff;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}
input[type="button"] {
  color: #fff;
}
button.logout.tablet,
button.logout.labtop,
button.logout.pc,
.login.mobile,
.login.tablet,
button.login.labtop,
button.login.pc {
  display: none;
}
#login-container .profile.mobile > p.mobile{
  display: block;
}
button.login.tablet,
button.login.mobile,
button.logout.mobile{
  display: inline-block;
  color: #fff;
}
button.logout.mobile i,button.login.mobile i {
  font-size: 16.5px;
  vertical-align: middle;
}
button.login.mobile i,
button.login.tablet i
 {
  font-size: 20px;
  padding:10px;
  vertical-align: middle;
}
.logout.mobile {
  display: none;
}
.profile {
  display: flex;
  padding-right: 10px;
  color: #fff;
  justify-content: space-around;
  align-items: center;
}
.profile p,
.profile input {
  padding-right: 10px;
  color: #fff;
}
.profile p {
  font-size: 1.1em;
  font-weight: normal;
}
.login-inner.email.mobile ,
.login-inner.password.mobile
.login-inner.email.tablet ,
.login-inner.password.tablet{ 
  width: 100%;
}
</style>