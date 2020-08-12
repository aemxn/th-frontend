<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link to="/explore">Explore</router-link>
        </li>
        <li>
          <router-link to="/create">Create</router-link>
        </li>
        <li>
          <b-link class="card-link" v-on:click="exportAll">Export</b-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "navigation",
  methods: {
    exportAll() {
      this.$http
        .get("/export")
        .then((response) => {
          var message = response.data.message;
          var filename = response.data.filename;
          var str = message + '\n' + 'Filename: ' + filename;
          alert(str);
        })
        .catch(error => alert(error));
    }
  }
};
</script>

<style scoped>
header {
  background: #234;
}

header a {
  color: #fff;
}

a.router-link-active {
  color: #4b8;
}

nav {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  align-content: space-between;
  padding: 20px;
}

ul li {
  display: inline-block;
}

li a {
  padding: 0px 10px;
  margin-left: 10px;
}
</style>