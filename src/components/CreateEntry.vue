<template>
  <b-card title="Create Entry">
    <b-form @submit.prevent="createEntry">
        <b-form-group
          id="input-group-title"
          label="Title:"
          label-for="input-title">
          <b-form-input required
            type="text"
            id="input-title"
            placeholder="Enter title"
            v-model="title"/>
        </b-form-group>
        
        <b-form-group
          id="input-group-date"
          label="Date:"
          label-for="input-date">
          <b-form-datepicker required
            id="input-date"
            v-model="date"/>
        </b-form-group>

        <b-form-group
          id="input-group-body"
          label="Body:"
          label-for="input-body">
          <b-form-textarea required
            id="input-body"
            placeholder="Write your journal..."
            rows="4"
            max-rows="8"
            cols="50"
            v-model.trim="body"/>
        </b-form-group>
      <b-button class="btn" variant="primary" type="submit">Submit</b-button>

      <i><small><span v-show="creating">Creating...</span></small></i>
      <i><small><span v-show="created">Created successfully</span></small></i>
      <i><small><span v-show="noCreate">Create Failed</span></small></i>
    </b-form>
  </b-card>
</template>
<script>
import bus from "./../bus.js";

export default {
  data() {
    return {
      entry: {},
      title: '',
      date: '',
      body: '',
      creating: false,
      created: false,
      noCreate: false
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
      this.creating = true;
      this.created = false;
      this.$http
        .post("/", entry)
        .then(() => {
          this.creating = false;
          this.created = true;
          this.clearFields();
          this.refreshEntries();
        })
        .catch(error => {
          this.creating = false;
          this.created = false;
          this.noCreate = true;
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