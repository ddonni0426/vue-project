<template>
  <div class="toolbar">
    <h1 class="logo">
      <router-link class="rt" to="/">
        <i class="fas fa-rocket"></i>
      </router-link>
    </h1>

    <ul class="menuList">
      <li class="searchBox">
        <input v-model="keyword" type="text" placeholder="검색어를 입력하세요." />
        <i class="fas fa-search" @click.prevent="onSearch"></i>
      </li>
      <li>
        <router-link class="rt" to="/gallery">Gallery</router-link>
      </li>
      <li>
        <router-link class="rt" to="/myview">MyFeed</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    onSearch() {
      if (this.keyword) {
        console.log(this.keyword);
      }
    }
  }
};
</script>

<style scoped>
.toolbar {
  line-height: 100px;
  height: 100px;
}
.toolbar::after {
  display: block;
  content: "";
  clear: both;
}
.toolbar .logo {
  float: left;
  height: 100%;
  font-size: 4.2rem;
  text-align: center;
  padding: 0 13px;
}
.rt {
  display: inline-block;
  width: 100%;
}
.toolbar .logo .rt .fas,
.toolbar li.searchBox .fas,
input,
a {
  /* 로켓 색상 */
  color: azure;
}
.toolbar .menuList {
  float: right;
}
.toolbar .menuList li {
  display: inline-block;
  margin: 0 auto;
  padding: 0 13px;
}
.toolbar .menuList .searchBox input {
  font-size: 16px;
  height: 30px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid azure;
  outline: none;
}
</style>