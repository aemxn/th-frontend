<template>
  <b-card title="Create Entry">
    <b-form @submit.prevent="createEntry">
        <b-form-group
          id="input-group-title"
          label="Title:"
          label-for="input-title">
          <b-form-input
            type="text"
            id="input-title"
            placeholder="Enter title"
            required
            v-model="title"/>
        </b-form-group>
        
        <b-form-group
          id="input-group-date"
          label="Date:"
          label-for="input-date">
          <b-form-datepicker
            id="input-date"
            required
            v-model="date"/>
        </b-form-group>

        <b-form-group
          id="input-group-body"
          label="Title:"
          label-for="input-body">
          <b-form-textarea
            id="input-body"
            placeholder="Write your journal..."
            rows="4"
            max-rows="8"
            cols="50"
            required
            v-model.trim="body"/>
        </b-form-group>
      <b-button variant="primary" type="submit">Submit</b-button>
    </b-form>
  </b-card>
</template>
<script>
import bus from "./../bus.js";

export default {
  data() {
    return {
      entry: {}
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

</style>