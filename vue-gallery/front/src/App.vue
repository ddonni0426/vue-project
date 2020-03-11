<template>
  <div id="app">
    <tool-bar id="toolbar"></tool-bar>
    <div id="areaWrap">
      <user-area id="user" class="area"></user-area>
      <content-area id="content" class="area"></content-area>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import ToolBar from "./layout/ToolBar.vue";
import UserArea from "./layout/UserArea.vue";
import ContentArea from "./layout/ContentArea.vue";

export default {
  name: "app",
  components: {
    ToolBar,
    ContentArea,
    UserArea
  },
  created() {
    this.$store.dispatch("SET_GalleryImage");
  }
};
</script>

<style scoped>
#toolbar {
  width: 100%;
  height: 100px;
  background-color: #081120;
  margin-bottom: 10px;
}
#areaWrap {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-basis: 0;
  flex-wrap: wrap;
}
#user {
  max-width: 600px;
  flex-grow: 1;

}
#content {
  flex-grow: 2;
  max-width: 100%;
  height: 100%;
  border-left: 1px solid #d3d3d3;
}
</style>
