<template>
  <div v-bind:show="entries.length>0" class="col align-self-center">
    <b>Showing 5 recent entries:</b>
    <b-card class="entry-card" v-bind:key="entry.id" v-for="entry in entries">

      <b-form-input required
        class="form-input" 
        size="sm"
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
      
      <b-button class="btn" size="sm" variant="outline-primary" v-on:click="updateTodo(entry)">Update</b-button>

      <b-button class="btn" size="sm" variant="danger" v-on:click="deleteTodo(entry.id)">Delete</b-button>
    </b-card>
  </div>
</template>

<script>
import bus from "./../bus.js";

export default {
  data() {
    return {
      entries: [],
      doneLoading: false
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
      this.$http.get("/latest").then(response => {
        this.entries = response.data;
      });
    },

    updateTodo(entry) {
      let id = entry.id;
      console.log(id);
      console.log(entry);
      this.$http
        .put(`/${id}`, entry)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },

    deleteTodo() {
        console.log('DELETE is disabled');
    //   this.$http.delete(`/${id}`).then(() => {
    //     this.fetchEntries();
    //   });
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
.entry-card {
  margin-bottom: 1em;
}
.form-input {
  margin-bottom: 0.5em;
}
.btn {
  margin: 0 5px 0 0;
}
</style>