<template>
  <div class="container">
    <div class="loginBox">
      <div>
        <!-- :href="getCodeUrl" -->
        <a @click.prevent="onLoginRq"></a>
        <span>로그인 후 {{fetchCode}}이용해 주세요 </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      getCodeUrl:
        "https://kauth.kakao.com/oauth/authorize?client_id=dec9c2e1206be02e001534b90240a161&redirect_uri=http://localhost:8080/oauth&response_type=code"
    };
  },
  computed: {
    ...mapGetters(["fetchCode"])
  },
  methods: {
    onLoginRq() {
      this.$store.dispatch("RequestLogin");
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.loginBox {
  width: 400px;
  height: 150px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  padding: 5px;
}

.loginBox > div {
  text-align: center;
  vertical-align: middle;
  margin-top: 31px;
}
.loginBox span {
  display: inline-block;
  width: 222px;
  height: 49px;
}
.loginBox a {
  display: inline-block;
  width: 222px;
  height: 49px;
  background: url("../assets/login-btn.png") no-repeat;
  outline: none;
  border: none;
}
</style>