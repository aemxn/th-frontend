<template>
<div>
  <h1 class="font-weight-bold page-title">Create New Entry</h1>
  <b-row>
    <b-col>
      <CreateEntry></CreateEntry>
    </b-col>
    <b-col cols="8">
      <ListEntry></ListEntry>
    </b-col>
  </b-row>
</div>
</template>

<script>
import CreateEntry from "../components/CreateEntry";
import ListEntry from "../components/ListEntry.vue";

export default {
  name: "create",
  components: { CreateEntry, ListEntry }
};
</script>

<style lang="scss">
// .cont {
//   padding: 1em;
// }
// .btn {
//   margin: 0 5px 0 0;
// }
</style>