<template>
  <div class="col align-self-center">
    <h3 class="pb-5 text-left underline">Create Entry</h3>
    <form class="sign-in" @submit.prevent="addTodo">
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
      name: "",
      typing: false
    };
  },
  methods: {
    addTodo(event) {
      if (event) event.preventDefault();
      let todo = {
        title: this.title,
        date: this.date,
        body: this.body
      };
      console.log(todo);
      this.$http
        .post("/", todo)
        .then(() => {
          this.clearTodo();
          this.refreshTodo();
          this.typing = false;
        })
        .catch(error => {
          console.log(error);
        });
    },

    clearTodo() {
      this.name = "";
    },

    refreshTodo() {
      bus.$emit("refreshTodo");
    }
  }
};
</script>
<style lang="scss" scoped>
.underline {
  text-decoration: underline;
}
</style>