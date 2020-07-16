<template>
  <b-container class="cont">
    <b-row>
      <b-col>
        <CreateTodo></CreateTodo>
        <b-link class="card-link" href="#">Explore</b-link>
        <b-link class="card-link" href="#">Search</b-link>
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
  components: { CreateTodo, ListTodo }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";

.cont {
  padding: 1em;
}

</style>