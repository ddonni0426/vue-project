<template>
  <div id="board" @click.prevent="addText">
  </div>
</template>

<script>
export default {
data(){
  return {};
},
methods:{
  addText(){
    document.querySelector('#board')
  }
},
}
</script>

<style scoped>

</style>