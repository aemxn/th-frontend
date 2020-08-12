<template>
  <b-row>
    <b-col>
      <CreateEntry></CreateEntry>
    </b-col>
    <b-col cols="8">
      <ListEntry></ListEntry>
    </b-col>
  </b-row>
</template>

<script>
import CreateEntry from "../components/CreateEntry";
import ListEntry from "../components/ListEntry.vue";

export default {
  name: "create",
  components: { CreateEntry, ListEntry },
  methods: {
    exportAll() {
      this.$http
        .get("/export")
        .then((response) => {
          var message = response.data.message;
          var filename = response.data.filename;
          var str = message + '\n' + 'Filename: ' + filename;
          alert(str);
        })
        .catch(error => alert(error));
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