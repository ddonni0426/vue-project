<template>
  <div class="userArea">
    <login-component v-if="!fetchUser"></login-component>
    <profile-component v-else></profile-component>
  </div>
</template>

<script>
import ProfileComponent from "../components/ProfileComponent.vue";
import LoginComponent from "../components/LoginComponent.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    ProfileComponent,
    LoginComponent
  },
  computed: {
    ...mapGetters(['fetchUser']),
}
};
</script>

<style scoped>
.userArea{
}
</style>>