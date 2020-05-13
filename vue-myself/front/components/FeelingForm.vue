<template>
  <div>
    <ul class="choose-mood" :class="$mq">
      <li>
        <a href="#" title="awesome" @click.prevent="addfeeling" :class="$mq">
          <i class="far fa-grin-hearts" title="awesome"></i>
        </a>
      </li>
      <li>
        <a href="#" title="good" @click.prevent="addfeeling" :class="$mq">
          <i class="far fa-laugh-wink" title="good"></i>
        </a>
      </li>
      <li>
        <a href="#" title="okay" @click.prevent="addfeeling" :class="$mq">
          <i class="far fa-smile" title="okay"></i>
        </a>
      </li>
      <li>
        <a href="#" title="depressed" @click.prevent="addfeeling" :class="$mq">
          <i class="far fa-sad-tear" title="depressed"></i>
        </a>
      </li>
      <li>
        <a href="#" title="terrible" @click.prevent="addfeeling" :class="$mq">
          <i class="far fa-angry" title="terrible"></i>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    addfeeling(e) {
      console.log(e.target.getAttribute("title"));
      this.$store.dispatch("feeling/addfeeling", {
        userId: this.$store.state.user.me.id,
        feeling: e.target.getAttribute("title")
      });
    }
  }
};
</script>

<style scoped>
.choose-mood li {
  display: inline-block;
  width: 50px;
  height: 50px;
}
.choose-mood li:first-child a {
  text-align: start;
}
.choose-mood li a {
  display: block;
  /* display: inline-flex;
  justify-content: start;
  align-items: center; */
  font-size: 2rem;
  width: 100%;
  height: 100%;
  line-height: 50px;
  text-align: start;
  border-radius: 15px;
}
.choose-mood.mobile > li a.mobile {
  width: 50px;
  height: 50px;
}
</style>