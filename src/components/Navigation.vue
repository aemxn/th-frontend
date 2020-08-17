<template>
  <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-nav>
        <b-nav-item to="/explore">Explore</b-nav-item>
        <b-nav-item to="/create">Create</b-nav-item>
        <b-nav-item to="/">Analytics</b-nav-item>
        <b-nav-item to="/" disabled><em>Server: {{ serverEnv }}</em></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Tools" right>
          <b-dropdown-item v-b-modal.modalExport v-on:click="exportAll">Export All (JSON)</b-dropdown-item>
          <b-dropdown-item target="_blank" href="http://github.com/aemxn/juno-ui/">Github</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item disabled><small>{{ getDateToday() }}</small></b-nav-item>

        <b-modal id="modalExport" title="Export Status" ok-only>
          <p class="my-4">{{ modalExport_msg }}</p>
        </b-modal>
      </b-navbar-nav>
  </b-navbar>
</template>

<script>
import EntryDataService from "../services/EntryDataService";
import IndexDataService from "../services/IndexDataService";

export default {
  name: "navigation",
  data () {
      return {
        modalExport_msg: "",
        dateToday: "",
        serverEnv: "sdf"
      }
  },
  created: function() {
    this.getServerEnvironment();
  },
  methods: {
    exportAll() {
      EntryDataService.export()
        .then((response) => {
          var message = response.data.message;
          var filename = response.data.filename;
          var str = message + '\n' + 'Filename: ' + filename;
          this.modalExport_msg = str;
        })
        .catch(error => this.modalExport_msg = error);
    },

    getServerEnvironment() {
      IndexDataService.getServerEnvironment()
      .then(response => {
        this.serverEnv = response.data.message;
      })
      .catch(error => this.serverEnv = error);
    },

    getDateToday() {
      return this.$utils.getDate();
    }
  }
};
</script>

<style scoped>
</style>