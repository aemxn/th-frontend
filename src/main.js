import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import Axios from './http';
import router from './router';
import Utils from './utils';

Vue.prototype.$http = Axios;
Vue.prototype.$utils = Utils;

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');