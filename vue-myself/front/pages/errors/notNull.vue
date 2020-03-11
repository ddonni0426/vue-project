<template>
  <div class="alert">
    <ul>
      <li>내용을 입력하세요!</li>
      <li>
        <a href="#" @click="back"> 돌아가기</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      return this.$router.back();
    }
  }
};
</script>

<style scoped>
.alert {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.alert ul {
  width: 500px;
  height: 300px;
  border: 8px double #fff;
  background: #333;
  color: #fff;
  text-align: center;
  line-height: 300px;
}
.alert ul li {
  /* display: inline-block; */
  height: 50px;
  font-size: 1.5em;
}
.alert ul li a {
  display: inline-block;
  border-bottom: 1px solid #fff;
  font-size: 0.7em;
  color: #fff;
}
</style>