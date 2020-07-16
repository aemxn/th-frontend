<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">Create Entry</h3>
    <form class="sign-in" @submit.prevent="createEntry">
      <div class="form-group todo__row">
        <input
          type="text"
          class="form-control"
          placeholder="Title"
          v-model="title"
        />
        <input
          type="date"
          class="form-control"
          placeholder="Date"
          v-model="date"
        />
        <textarea
          type="text"
          class="form-control"
          placeholder="Body"
          rows="4"
          cols="50"
          v-model.trim="body"
        />
      </div>
      <button type="submit" class="button is-danger">Submit</button>
    </form>
  </div>
</template>
<script>
import bus from "./../bus.js";

export default {
  data() {
    return {
      entry: {},
      typing: false
    };
  },
  methods: {
    createEntry(event) {
      if (event) event.preventDefault();
      let entry = {
        title: this.title,
        date: this.date,
        body: this.body
      };
      console.log(entry);
      this.$http
        .post("/", entry)
        .then(() => {
          this.clearFields();
          this.refreshEntries();
        })
        .catch(error => {
          console.log(error);
        });
    },

    clearFields() {
      this.name = "";
      this.body = "";
    },

    refreshEntries() {
      bus.$emit("refreshEntries");
    }
  }
};
</script>
<style lang="scss" scoped>
.underline {
  text-decoration: underline;
}
</style>