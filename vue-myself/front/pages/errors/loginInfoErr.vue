<template>
  <div id="modal-bg" :class="$mq">
    <div class="modal" :class="$mq">
      <section>{{alarm}}을 다시 확인해 주세요</section>
      <button @click="closeModal">확인</button>
    </div>
  </div>
</template>

<script>
export default {
props:{
  alarm:{type: String, required: true}
},
  methods: {
    closeModal() {
     this.$emit('close',null)
    }
  }
};
</script>

<style scoped>
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