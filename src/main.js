import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$remoteHost = 'http://localhost:8080/';

new Vue({
  render: (h) => h(App),
  router,
  store,
  remoteServer: 'http://localhost:8081',
}).$mount('#app');
