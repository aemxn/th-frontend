<template>
  <div class="cont">
    <CodeInput :loading="false" class="input" v-on:change="onPinKeyUp" v-on:complete="onComplete" />
  </div>
</template>

<script>
import CodeInput from "vue-verification-code-input";
import { AUTH_REQUEST } from "../store/actions/auth";

export default {
  name: "login",
  components: {
    CodeInput
  },
  data() {
    return {
        username: '',
        password: ''
    };
  },
  methods: {
    login: function() {
      const { username, password } = this;
      this.$store.dispatch(AUTH_REQUEST, { username, password }).then(() => {
        this.$router.push("/explore");
      });
    },
    onPinKeyUp(input) {
      console.log("onPinKeyUp ", input);
    },
    onComplete(input) {
      // console.log("onComplete ", input);
      this.username = input;
      this.password = input;
      this.login();
      // check localstorage for correct pin
      // if correct, loggedin true, else false
    },
  }
};
</script>

<style>

</style>