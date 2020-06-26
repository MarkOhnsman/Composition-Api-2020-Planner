import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Auth0Plugin } from "@bcwdev/auth0-vue";
import { domain, clientId, audience } from "./authConfig";
import { AppState } from "./AppState";


Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: routerState => {
    router.push(
      routerState && routerState.targetUrl
        ? routerState.targetUrl
        : window.location.pathname
    );
  }
});

// REVIEW Add AppState to prototype for global access

Vue.prototype.AppState = AppState

new Vue({
  router,
  data() {
    return AppState
  },
  render: function (h) {
    return h(App);
  }
}).$mount("#app");
