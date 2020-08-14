# Webpack Custom Resolver

## What

In short, webpack accepts custom resolver plugins that let you intercept and manipulate requests. That is, whenever you write something like

```javascript
import styles from 'App.styles.js';
```

a resolver plugin may for example substitute `App.styles.js` with something like `App.bmw.styles.js`.

This minimal example shows this feature in action.

## Why

As detailed in [this blog post](https://medium.com/bauer-kirch/how-to-reuse-one-vue-js-codebase-across-multiple-apps-3d2756a6552) of mine, our particular use case is to have exactly one [Vue.js](https://github.com/vuejs/vue) app, uniquely branded for different customers.

However, the implementation shown in this repository is more up-to-date than the one in our blog which relied on resolving requests at runtime with the help of [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html). Resolving at build-time has several advantages, most notably smaller bundle-sizes and slightly faster JavaScript execution times.

## How

There are three npm scripts, each of which starts a [webpack-dev-server](https://github.com/webpack/webpack-dev-server). Both the `dev:bmw` and `dev:ferrari` scripts pass an environment variable `CUSTOMER` with [cross-env](https://github.com/kentcdodds/cross-env) which helps determine resolving to the correct style implementation.

In this example, `./commons/App/App.vue` imports `./commons/App/App.styles.js` which resolves depending on the value `CUSTOMER` holds.

The most interesting file is `./StyleResolverPlugin.js` – this is where the magic happens.

## Start

Depending on what script you execute, different CSS will be applied.

```bash
npm run dev         # with `./commons/App/App.styles.js`
npm run dev:bmw     # with `./commons/App/App.bmw.styles.js`
npm run dev:ferrari # with `./commons/App/App.ferrari.styles.js`
```

## Caveat

This of course breaks the expected behaviour of [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and introduces a hard dependency on webpack for your project. Should you want to use this technique, make sure to document it somewhere so that others (maybe even future-you) don't get utterly confused.

## Further information

- [Blog "How to reuse one Vue.js codebase across multiple apps"](https://medium.com/bauer-kirch/how-to-reuse-one-vue-js-codebase-across-multiple-apps-3d2756a6552)
- [Webpack resolve docs](https://webpack.js.org/configuration/resolve/)
- [Webpack resolve-plugin docs](https://github.com/webpack/enhanced-resolve#plugins)
