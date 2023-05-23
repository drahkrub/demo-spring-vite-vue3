# demo-spring-vite-vue3

This is a **very** small [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/) project
which uses **two** simplified [Vue.js](https://vuejs.org/) demo projects as (part of) its frontend.

There are several strategies to integrate these technologies.

Up to now I've successfully used

- [Vue CLI](https://cli.vuejs.org/) (which is backed by [Webpack](https://webpack.js.org/))
- and [Quasar CLI with Webpack](https://quasar.dev/quasar-cli-webpack/quasar-config-js)

as development and build tools for Vue.js frontends.

I would like to switch to

- [Vite](https://vitejs.dev/)
- and [Quasar CLI with Vite](https://quasar.dev/quasar-cli-vite/quasar-config-js)

but I have a problem with the development setup if I use "my kind of strategy" to integrate these technologies.

That's why I set up this demo project. ;-)

## Run everything in production mode

Build and start the demo with: `mvn clean spring-boot:run`

### Steps during the build:

1. The [Frontend Maven Plugin](https://github.com/eirslett/frontend-maven-plugin)

   - installs node and yarn locally
   - builds the [Vue CLI](https://cli.vuejs.org/) project in `src/main/frontend/vue-cli-project/`
   - builds the [Vite](https://vitejs.dev/) project in `src/main/frontend/vite-project/`

2. The [Spring Boot Maven Plugin](https://docs.spring.io/spring-boot/docs/current/maven-plugin/reference/htmlsingle)

   - triggers the compiler to compile the backend java code
   - starts the integrated tomcat server

### Browse the demo

Open http://localhost:8080/ in your preferred browser.

You will see a static HTML-Page (located in `src/main/resources/static/index.html`) providing two links to jump into the demo frontends build with vue-cli and vite respectively. Everything works as expected, both [Vue Routers](https://router.vuejs.org) use the [recommended HTML5 Mode (history mode)](https://router.vuejs.org/guide/essentials/history-mode.html#html5-mode), you can switch between `/v/` and `/v/about/` (resp. `/w/` and `/w/about/`) whereby the about page loads and displays some JSON fetched from the Spring-Boot backend.

### How does it work?

The Integration is based on different base URLs for the Vue Router and for the build processes:

| Option                 | `vite.config.js`                     | `vue.config.js`                         |
| ---------------------- | ------------------------------------ | --------------------------------------- |
| `outDir` / `outputDir` | `target/classes/static/vite-project` | `target/classes/static/vue-cli-project` |
| `base`/ `publicPath`   | `/vite-project/`                     | `/vue-cli-project/`                     |
| `VUE_ROUTER_BASE`      | `/v/`                                | `/w/`                                   |

The build processes of both javascript projects place their generated assets in `target/classes/static/vite-project` and `target/classes/static/vue-cli-project` respectively (`src/main/resources/static/vite-project` and `src/main/resources/static/vue-cli-project` would be virtually the same).

This way each static asset is reachable under `http://localhost:8080/vite-project/[...]` and `http://localhost:8080/vue-cli-project/[...]`.

And by forwarding each URL matching `/v/**` and `/w/**` to `/vite-project/index.html` and `/vue-cli-project/index.html` respectively, the vue router in question can take over the handling of the given URL, see `MyController.java`:

```
    @GetMapping("/v/**")
    public String viteProject() {
        return "forward:/vite-project/index.html";
    }

    @GetMapping("/w/**")
    public String vueCliProject() {
        return "forward:/vue-cli-project/index.html";
    }
```

## Running in development mode

### vue-cli (no problems at all)

In `src/main/frontend/vue-cli-project` start a dev server (based on [webpack-dev-server](https://github.com/webpack/webpack-dev-server)) via the command `yarn serve` or `npm run serve`. Your default browser should open as soon as the dev server has been started. Everything works like in production mode including [live reload (HMR)](https://webpack.js.org/configuration/dev-server/#devserverhot).

### vite (finally the problematic part)

In `src/main/frontend/vite-project` start a dev server via the command `yarn dev` or `npm run dev`. Your default browser should open as soon as the dev server has been started - and here the problems arise:

1. The URL opened is `.../v/ite-project/`?! Strange, but one can get over it. Just click on the home link to go to `/v/`...
2. If you are on `/v/` (or somewhere else) and do a **browser reload** the following message appears:

   > "The server is configured with a public base URL of /vite-project/ - did you mean to visit /vite-project/v/ instead?"

   Unfortunately, there is no way to answer this question (with "NO!") and I don't know how to configure it away.

3. Loading the example JSON from `/api` does not work on the about page (`/v/about`). The reason is that the proxy option in `vite.config.js` is unconfigured. I can get it to work explicitly for `/api` but what if you have to handle hundreds of different backend URLs? All generic ways I've tried destroy live reload (HMR)!

**Should it not be possible under vite**

- to use different values for `base` in `vite.config.js` and for configuring the [Vue Router](https://router.vuejs.org/api/#Functions-createWebHistory)?
- to proxy all URLs except the ones starting with the Vue Router base URL without (at least) destroying the live reload feature of the dev server?

(any PRs are welcome)

Some links:

* https://github.com/vitejs/vite/discussions/13299
* https://stackoverflow.com/questions/76309242/switching-from-vue-cli-to-vite-with-spring-boot-as-backend-dev-server-not-worki
* https://stackoverflow.com/questions/75753422/vite-dev-servers-hmr-not-working-with-spring-boot
