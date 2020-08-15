<template>
    <h1 class="font-weight-bold page-title">{{ firstTitle }} <small class="text-muted">{{ secondTitle }}</small></h1>
</template>

<script>
export default {
  name: "heading-title",
  props: {
      firstTitle: String,
      secondTitle: String
  }
};
</script>

<style scoped>
</style>