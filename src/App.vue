<template>
  <b-container class="cont">
    <b-row>
      <b-col>
        <b-link class="card-link" href="#">Explore</b-link>
        <b-link class="card-link" href="#">Search</b-link>
        <b-link class="card-link" href="#">Export</b-link>
        <CreateEntry></CreateEntry>
      </b-col>
      <b-col cols="8">
        <ListEntry></ListEntry>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CreateEntry from "./components/CreateEntry.vue";
import ListEntry from "./components/ListEntry.vue";

export default {
  name: "app",
  components: { CreateEntry, ListEntry }
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