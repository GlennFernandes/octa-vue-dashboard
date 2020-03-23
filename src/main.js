import Vue from 'vue';

import {
  MdButton,
  MdContent,
  MdCard,
  MdRipple,
  MdDrawer,
  MdField,
  MdProgress,
  MdSnackbar,
} from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css';
import * as firebase from 'firebase';

import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

// https://github.com/vuematerial/vue-material/issues/662

Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdCard);
Vue.use(MdRipple);
Vue.use(MdDrawer);
Vue.use(MdField);
Vue.use(MdProgress);
Vue.use(MdSnackbar);

Vue.config.productionTip = false;

const configOptions = {
  apiKey: 'AIzaSyBsMfgsHNyypJnmf96tT0OLo8UMFY-ZMNE',
  authDomain: 'octalogic-portfolio-dev.firebaseapp.com',
  databaseURL: 'https://octalogic-portfolio-dev.firebaseio.com',
  projectId: 'octalogic-portfolio-dev',
  storageBucket: 'octalogic-portfolio-dev.appspot.com',
  messagingSenderId: '972342187770',
  appId: '1:972342187770:web:f425e591de136a72359b43',
  measurementId: 'G-LM82D4HJDN',
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('fetchUser', user);
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.auth.user.loggedIn;
  console.log(to.name,isAuthenticated);
  if (to.name !== 'Login' && !isAuthenticated){
    next({ name: 'Login' });
  }
  else if(to.name ==='Login' && isAuthenticated){
    next({ name: 'Home' });
  }
  else next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
