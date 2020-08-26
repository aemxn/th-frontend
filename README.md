# Juno

Juno was intentionally built as a platform to write daily journal and as a note taking app.

[Screenshot v1][ss-v1]

## Prerequisite

_Read the [docs][docs]._

This project needs the backend server located in [Juno (Server)][2].

> It is advised to run these instances on your local machine to ensure privacy of your data. However, I do not enforce this rule inside the code. Users are free to host it anywhere on a webserver or anything.

Start the server first before building client.

Project setup:
```
$ npm install
```

## Building for browser

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

## Building for Electron app

Compiles for development build:
```
$ npm run electron:serve
```

Compiles for production:

*This will build a Windows executable file*
```
$ npm run electron:build
```

[2]: https://github.com/aemxn/juno-server
[ss-v1]: https://raw.githubusercontent.com/aemxn/juno-ui/master/_screenshot/ss-v1.jpg
[docs]: https://github.com/aemxn/juno-ui/blob/master/_docs/