<template>
  <div v-bind:show="entries.length>0" class="col align-self-center">
    <p>Showing 5 recent entries:</p>
    <div class="form-row align-items-center" v-bind:key="entry.id" v-for="entry in entries">
      <div class="col-auto my-1">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            v-model="entry.title"
          />
          <input
            type="date"
            class="form-control"
            v-model="entry.date"
          />
          <textarea
            type="text"
            class="form-control"
            rows="4"
            cols="50"
            v-model="entry.body"
          />
          
          <div class="input-group-append">
            <div class="input-group-text">
              <span
                class="input-group-addon addon-left"
                title="Delete entry?"
                v-on:click="updateTodo(entry)"
              >
                O
              </span>
            </div>
          </div>
          <div class="input-group-append">
            <div class="input-group-text">
              <span
                class="input-group-addon addon-left"
                title="Delete entry?"
                v-on:click="deleteTodo(entry.id)"
              >
                X
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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

.no_border_left_right {
  border-left: 0px;
  border-right: 0px;
}

.flat_form {
  border-radius: 0px;
}

.mrb-10 {
  margin-bottom: 10px;
}

.addon-left {
  background-color: none !important;
  border-left: 0px !important;
  cursor: pointer !important;
}

.addon-right {
  background-color: none !important;
  border-right: 0px !important;
}
</style>