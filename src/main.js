import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import Axios from './http';

Vue.prototype.$http = Axios;

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');