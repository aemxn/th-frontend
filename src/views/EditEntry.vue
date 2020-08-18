<template>
<div>
  <HeadingTitle firstTitle="Edit" secondTitle="Entry" />
  <div>
    <p><b-link href="#" class="text-decoration-none" @click="navigateBack">Go back</b-link></p>
    <div v-if="entry">
    <b-card class="shadow-sm p-3 mb-5 bg-white rounded">
      <b-form @submit.prevent="updateEntry(entry)" @reset="deleteEntry(entry.id)">
        <b-form-input required
          class="form-input"
          type="text"
          v-model="entry.title"/>

        <b-form-datepicker required
          class="form-input"
          size="sm"
          :max="max"
          v-model="entry.date"/>

        <b-form-textarea required
          class="form-input"
          rows="4"
          max-rows="10"
          cols="50"
          v-model="entry.body"/>
        
        <b-button type="submit" class="btn" size="sm" variant="outline-primary">Update</b-button>
        <!-- <b-button type="reset" class="btn" size="sm" variant="danger">Delete</b-button> -->

        <p class="font-italic text-muted"><span v-if="updateId === entry.id" v-show="updating">Updating&#8230;</span></p>
        <p class="font-italic text-muted"><span v-if="updateId === entry.id" v-show="updated">{{ updatedMsg }}</span></p>
        <p class="font-italic text-muted"><span v-if="updateId === entry.id" v-show="updateFailed">{{ updateErrorMsg }}</span></p>
      </b-form>
    </b-card>
    </div>
    <div v-else>
        <EmptyView/>
    </div>
  </div>
</div>
</template>

<script>
import HeadingTitle from "../components/HeadingTitle.vue";
import EmptyView from "../components/EmptyView.vue";
import EntryDataService from "../services/EntryDataService";

export default {
  name: "edit-entry",
  props: {
    id: Number
  },
  components: {
    EmptyView, HeadingTitle
  },
  data() {
    const maxDate = new Date();
    
    return {
      entry: {},
      entryId: 0,
      doneLoading: false,
      updated: false,
      updating: false,
      updateFailed: false,
      updateId: "",
      updatedMsg: "",
      updateErrorMsg: "",
      max: maxDate
    };
  },
  created: function() {
    this.entryId = this.id;
    this.fetchEntryById(this.entryId);
  },
  methods: {
    fetchEntryById(id) {
        EntryDataService.getEntryById(id)
        .then(response => this.entry = response.data)
        .catch(error => console.log(error));
    },

    updateEntry(entry) {
      let id = entry.id;
      this.updating = true;
      
      EntryDataService.update(id, entry)
        .then(response => {
          this.updating = false;
          this.updated = true;
          this.updateFailed = false;
          this.updateId = id;
          this.updatedMsg = response.data.message;
          this.fetchEntryById(this.id);
        })
        .catch(error => {
          this.updating = false;
          this.updated = false;
          this.updateFailed = true;
          this.updateErrorMsg = error.response.data.message;
        });
    },

    deleteEntry(id) {
      console.log(id);
      EntryDataService.delete(id)
      .then((response) => {
        console.log(response.data);
      })
      .catch(error => console.log(error));
    },

    navigateBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.form-input {
  margin-bottom: 0.5em;
}
</style>