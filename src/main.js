import Vue from 'vue';

import {
  MdApp,
  MdToolbar,
  MdList,
  MdButton,
  MdContent,
  MdCard,
  MdRipple,
  MdDrawer,
  MdField,
  MdProgress,
  MdSnackbar,
  MdIcon,
  MdTable,
  MdCheckbox,
  MdDialog,
  MdMenu,
  MdEmptyState,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
// import 'vue-material/dist/theme/default.css';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import VueMq from 'vue-mq';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import firebaseConfig from './constants/firebase';

// https://github.com/vuematerial/vue-material/issues/662

Vue.use(MdApp);
Vue.use(MdToolbar);
Vue.use(MdList);
Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdCard);
Vue.use(MdRipple);
Vue.use(MdDrawer);
Vue.use(MdField);
Vue.use(MdProgress);
Vue.use(MdSnackbar);
Vue.use(MdIcon);
Vue.use(MdTable);
Vue.use(MdCheckbox);
Vue.use(MdDialog);
Vue.use(MdMenu);
Vue.use(MdEmptyState);

Vue.use(VueMq, {
  breakpoints: {
    xsmall: 599,
    small: 959,
    medium: 1279,
    large: 1919,
    xlarge: Infinity,
  },
});

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('setUser', user);
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.auth.user.loggedIn;
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Dashboard' });
  } else next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
