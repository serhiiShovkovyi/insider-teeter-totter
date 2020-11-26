import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";

Vue.config.productionTip = false;

Vue.use(Vuesax);

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
