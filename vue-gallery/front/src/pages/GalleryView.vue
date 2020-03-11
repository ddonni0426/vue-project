<template>
<div class="flexBox">
  <ol class="wrapper">
    <li v-for="image in fetchImage" :key="image.id" class="gridItem">
      <img :src="`${image}`" alt />
    </li>
  </ol>
</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      images: []
    };
  },
  computed: {
    ...mapGetters(["fetchImage"])
  },
  methods: {}
};
</script>

<style scoped>
.flexBox{
  display: flex;
}
.wrapper {
  position: relative;
  height: 1027px;
  max-width: 100%;
  display: block;
}
li {
 position: relative;
  display: list-item;
  width: 300px;
  list-style: none;
  overflow: hidden;
}
li:nth-child(3n){
  right: 0;
}
li:nth-child(n){
  left: 0;
}
img {
  position: absolute;
  max-width: 100%;
}
</style>