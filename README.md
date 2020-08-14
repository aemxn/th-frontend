# Juno
### UI

p/s: I suck at front-end, so I just copy and pasted the boilerplate from [this guy][1].

### Prerequisite

This project needs the backend server located in [Juno (Server)][2].

Start the server first before building this project.

Project setup:
```
$ npm install
```

### Building for browser

Compiles and hot-reloads for development:
```
$ npm run dev
```

Compiles and minifies for production:
```
$ npm run prod
```

Lints and fixes files:
```
$ npm run lint
```

Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Building for Electron app

Compiles for development build:
```
$ npm run electron:serve
```

Compiles for production:

*This will build a Windows executable file*
```
$ npm run electron:build
```

### Code

#### Adding a router

1. Create a new view (.vue)
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



[1]: https://dev.to/abiodunjames/build-a-todo-app-with-nodejs-expressjs-mongodb-and-vuejs--part-2--3k11
[loading-indicator]: https://codepen.io/sethdavis512/pen/vJxNdq
[2]: https://github.com/aemxn/juno-server
[3]: https://router.vuejs.org/