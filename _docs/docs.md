<h3>Table of Contents</h3>

- [Adding a router](#adding-a-router)
- [View/component template](#viewcomponent-template)
- [Event Bus](#event-bus)
- [Read](#read)

## Adding a router

1. Create a new .vue file in `/views` (strictly for layout files)
2. Add the path in `router/index.js`
3. That's it

In navbar, add the link in `components/Navigation.vue`.

*Example:*

```html
<b-nav-item to="/explore">Explore</b-nav-item>
```

In Javascript method, click listener can use it as follows:

```js
navigate() {
    this.$router.push({ name: "Explore" });
    // or
    this.$router.go(-1);
}
```

RTFM: https://router.vuejs.org/

## View/component template

1. Create a new .vue file in `/views` or `/components`
2. Use this template

**Components:** reusable component of a layout  
**Views:** mainly, parent layout consists of several components

```html

<template>
<div>
    <HeadingTitle firstTitle="title" secondTitle="title" />

    <div v-if="var">
        <!-- content here -->
    </div>

    <div v-else>
        <EmptyView/>
    </div>
</div>
</template>

<script>
import HeadingTitle from "../components/HeadingTitle.vue";
import EmptyView from "../components/EmptyView.vue";

export default {
    name: "name",
    components: { HeadingTitle, EmptyView },
    data () {
        return {
            var: false
        }
    },

    // called after the DOM has been mounted or rendered. Here you have access to the DOM elements and DOM manipulation can be performed for example get the innerHTML
    mounted: function() {

    },

    // since the processing of the options is finished you have access to reactive data properties and change them if you want. At this stage DOM has not been mounted or added yet. So you cannot do any DOM manipulation here
    created: function() {
        this.doApiCall(1);
    },

    methods: {
        doApiCall(param) {
            // Service.get().then()
            return param;
        }
    }
};
</script>

<style lang="scss">
</style>
```
## Event Bus

**Emit**

```javascript
import bus from "./../bus.js";

...

onRefreshEntries() {
    bus.$emit("refreshEntries");
}
```

**Receive**

```javascript
import bus from "./../bus.js";

...

created: function() {
    this.onRefreshEntries();
},
onRefreshEntries() {
    bus.$on("refreshEntries", () => {
        // do event
    });
}
```

## Read

- Boilerplate UI from [this guy][1]
- Bootstrap Vue: https://bootstrap-vue.org/docs/components/
- Bootstrap: https://getbootstrap.com/docs/4.5/utilities/
- Axios: https://github.com/axios/axios
- Vue lifecycle: [https://medium.com/@akgarg007/vuejs-created-vs-mounted-life-cycle-hooks-74c522b9ceee][4]/ [Cheatsheet](https://imgur.com/B7uFZGc)
)

[1]: https://dev.to/abiodunjames/build-a-todo-app-with-nodejs-expressjs-mongodb-and-vuejs--part-2--3k11
[loading-indicator]: https://codepen.io/sethdavis512/pen/vJxNdq
[2]: https://github.com/aemxn/juno-server
[3]: https://router.vuejs.org/
[4]: https://medium.com/@akgarg007/vuejs-created-vs-mounted-life-cycle-hooks-74c522b9ceee
[ss-v1]: https://raw.githubusercontent.com/aemxn/juno-ui/master/_screenshot/ss-v1.jpg