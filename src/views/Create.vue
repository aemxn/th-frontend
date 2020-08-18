<template>
<div>
  <HeadingTitle firstTitle="Create" secondTitle="New Entry" />
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
import CreateEntry from "../components/CreateEntry.vue";
import ListEntry from "../components/ListEntry.vue";
import HeadingTitle from "../components/HeadingTitle.vue";

export default {
  name: "create",
  components: { CreateEntry, ListEntry, HeadingTitle }
};
</script>

<style lang="scss">
</style>