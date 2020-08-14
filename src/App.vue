<template>
  <b-container>
    <Navigation />
    
    <div class="cont">
      <router-view />
    </div>
  </b-container>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "app",
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
.cont {
  padding: 1em;
}
header {
  font-size: 3em;
  padding-bottom: 0.5em;
}
.pagination {
  padding-top: 0.5em;
}
</style>