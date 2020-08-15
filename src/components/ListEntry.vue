<template>
  <div v-bind:show="entries.length>0" class="col align-self-center">
    <b>Showing {{ entries.length }} recent entries:</b>
    <b-card class="shadow-sm p-3 mb-5 bg-white rounded" v-bind:key="entry.id" v-for="entry in entries">
      <b-form @submit.prevent="updateEntry(entry)" @reset="deleteEntry(entry.id)">
        <b-form-input required
          class="form-input"
          type="text"
          v-model="entry.title"/>

        <b-form-datepicker required
          class="form-input"
          size="sm"
          v-model="entry.date"/>

        <b-form-textarea required
          class="form-input"
          size="sm"
          rows="4"
          max-rows="8"
          cols="50"
          v-model="entry.body"/>
        
        <b-button type="submit" class="btn" size="sm" variant="outline-primary">Update</b-button>
        <!-- <b-button type="reset" class="btn" size="sm" variant="danger">Delete</b-button> -->

        <i><small><span v-if="updateId === entry.id" v-show="updating">Updating...</span></small></i>
        <i><small><span v-if="updateId === entry.id" v-show="updated">Updated successfully</span></small></i>
        <i><small><span v-if="updateId === entry.id" v-show="noUpdate">Update Failed</span></small></i>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import bus from "./../bus.js";

export default {
  data() {
    return {
      entries: [],
      doneLoading: false,
      updated: false,
      updating: false,
      noUpdate: false,
      updateId: ""
    };
  },
  created: function() {
    this.fetchEntries();
    this.listenToEvents();
  },
  watch: {
    $route: function() {
      let self = this;
      self.doneLoading = false;
      self.fetchData().then(function() {
        self.doneLoading = true;
      });
    }
  },
  methods: {
    fetchEntries() {
      this.$http.get("/latest")
      .then(response => this.entries = response.data )
      .catch(error => console.log(error));
    },

    updateEntry(entry) {
      let id = entry.id;
      console.log(id);
      console.log(entry);
      this.updating = true;
      this.updated = false;
      this.$http
        .put(`/${id}`, entry)
        .then(response => {
          console.log(response);
          this.updating = false;
          this.updated = true;
          this.updateId = id;
        })
        .catch(error => {
          this.updating = false;
          this.updated = false;
          this.noUpdate = true;
          console.log(error);
        });
    },

    deleteEntry(id) {
      console.log(id);
      // this.$http.delete(`/${id}`).then(() => {
      //   this.fetchEntries();
      // });
    },

    listenToEvents() {
      bus.$on("refreshEntries", () => {
        this.fetchEntries(); //update entry
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form-input {
  margin-bottom: 0.5em;
}
</style>