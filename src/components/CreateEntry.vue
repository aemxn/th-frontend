<template>
  <b-card class="shadow-sm p-3 mb-5 bg-white rounded" title="Create Entry">
    <b-form @submit.prevent="createEntry">
        <b-form-group
          id="input-group-title"
          label="Title:"
          label-for="input-title">
          <b-form-input required
            type="text"
            id="input-title"
            :state="titleState"
            aria-describedby="input-title-validation"
            placeholder="Enter title"
            v-model="title"/>

          <b-form-invalid-feedback id="input-title-validation">
            Title must not exceed {{ maxTitleLength }} characters
          </b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group
          id="input-group-date"
          label="Date:"
          label-for="input-date">
          <b-form-datepicker required
            id="input-date"
            :max="max"
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
            max-rows="10"
            cols="50"
            v-model="body"/>
        </b-form-group>
      <b-button class="btn" variant="primary" type="submit">Submit</b-button>

      <p class="font-italic text-muted"><span v-show="creating">Creating&#8230;</span></p>
      <p class="font-italic text-muted"><span v-show="created">{{ createdMsg }}</span></p>
      <p class="font-italic text-muted"><span v-show="createFailed">{{ createFailedMsg }}</span></p> 
    </b-form>
  </b-card>
</template>
<script>
import EntryDataService from "../services/EntryDataService";
import bus from "./../bus.js";

export default {
  data() {
    const maxDate = new Date();

    return {
      entry: {},
      title: '',
      date: '',
      body: '',
      creating: false,
      created: false,
      createFailed: false,
      createdMsg: "",
      createFailedMsg: "",
      max: maxDate,
      maxTitleLength: 80
    };
  },
  methods: {
    createEntry(event) {
      if (event) event.preventDefault();

      if (this.date === "") {
        this.createFailed = true;
        this.createFailedMsg = "Date not selected"
        return;
      }

      if (this.title.length > this.maxTitleLength) return;

      let entry = {
        title: this.title,
        date: this.date,
        body: this.body
      };

      this.creating = true;

      EntryDataService.create(entry)
        .then(response => {
          this.creating = false;
          this.createFailed = false;
          this.created = true;
          this.createdMsg = response.data.message;
          this.clearFields();
          this.refreshEntries();
        })
        .catch(error => {
          this.creating = false;
          this.created = false;
          this.createFailed = true;
          this.createFailedMsg = error.response.data.message;
        });
    },

    clearFields() {
      this.title = "";
      this.body = "";
      this.date = "";
    },

    refreshEntries() {
      bus.$emit("refreshEntries");
    }
  },
  computed: {
    titleState() {
      return this.title.length > this.maxTitleLength ? false : true
    }
  }
};
</script>
<style lang="scss" scoped>

</style>