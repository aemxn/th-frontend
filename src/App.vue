<template>
  <div>
    <Navigation />
    <div class="cont">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { USER_REQUEST } from "./store/actions/user";

export default {
  name: "app",
  components: {
    Navigation
  },
  data () {
      return {
      }
  },
  created: function() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  },
  methods: {
  }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600');

body,
html {
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1rem;
  background-color: #f2f4f7;
  color: #262626;
}

.cont {
  padding: 1em;
}
.page-title {
  font-size: 3em;
  padding-bottom: 0.5em;
}
.pagination {
  padding-top: 0.5em;
}
</style>