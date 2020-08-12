<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <a style="cursor: pointer; text-decoration: underline" v-on:click="navigate()">Navigate to Create</a>
    </div>
</template>

<script>
    export default {
        name: 'explore',
        data () {
            return {
                msg: 'Explore Page'
            }
        },
        methods: {
            navigate() {
                // this.$router.push({ name: "Create" });
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>