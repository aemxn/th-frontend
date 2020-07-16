<template>
  <b-container class="cont">
    <b-row>
      <b-col>
        <b-link class="card-link" href="#">Explore</b-link>
        <b-link class="card-link" href="#">Search</b-link>
        <b-link class="card-link" href="#">Export</b-link>
        <CreateTodo></CreateTodo>
        <small><i>{{ footer }}</i></small>
      </b-col>
      <b-col cols="8">
        <ListTodo></ListTodo>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CreateTodo from "./components/CreateTodo.vue";
import ListTodo from "./components/ListTodo.vue";

export default {
  name: "app",
  components: { CreateTodo, ListTodo },
  data() {
    return {
      footer: "aemxn (2020)"
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";
.cont {
  padding: 1em;
}
.btn {
  margin: 0 5px 0 0;
}
</style>