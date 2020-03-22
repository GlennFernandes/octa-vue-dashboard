import Vue from 'vue';

import { MdButton, MdContent, MdCard, MdRipple } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdCard);
Vue.use(MdRipple);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
