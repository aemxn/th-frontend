<template>
  <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-nav>
        <b-nav-item-dropdown text="Journal">
          <b-nav-item to="/explore">Explore</b-nav-item>
          <b-nav-item to="/create">Create</b-nav-item>
        </b-nav-item-dropdown>
        <b-nav-item to="/notes">Notes</b-nav-item>
        <b-nav-item to="/analytics">Analytics</b-nav-item>
        <b-nav-item to="/" disabled><em>Server: {{ serverEnv }}</em></b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-dropdown-item v-if="isAuthenticated" @click="logout" v-b-tooltip.hover title="Lock app">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-unlock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z"/>
            <path fill-rule="evenodd" d="M8.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
          </svg>
        </b-dropdown-item>
        <b-dropdown-item v-if="!isAuthenticated && !authLoading" v-b-tooltip.hover title="App is locked">
          <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-lock-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 9a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V9z"/>
            <path fill-rule="evenodd" d="M4.5 4a3.5 3.5 0 1 1 7 0v3h-1V4a2.5 2.5 0 0 0-5 0v3h-1V4z"/>
          </svg>
        </b-dropdown-item>
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
import { mapGetters, mapState } from "vuex";
import { AUTH_LOGOUT } from "../store/actions/auth";

export default {
  name: "navigation",
  data () {
      return {
        modalExport_msg: "",
        dateToday: "",
        serverEnv: ""
      }
  },
  created: function() {
    this.getServerEnvironment();
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.auth.status === "loading"
    })
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

    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/login"));
    },

    getDateToday() {
      return this.$utils.getDate();
    }
  }
};
</script>

<style scoped>
</style>