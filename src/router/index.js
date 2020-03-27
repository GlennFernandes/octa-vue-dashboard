import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

import DashboardLayout from '../layouts/DashboardLayout.vue';

import Dashboard from '../views/Dashboard.vue';
import Categories from '../views/Categories.vue';
import Technologies from '../views/Technologies.vue';
import Clients from '../views/Clients.vue';
import Projects from '../views/Projects.vue';
import Portfolios from '../views/Portfolios.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardLayout,
    props: { childComponent: Dashboard },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: DashboardLayout,
    props: { childComponent: Categories },
  },
  {
    path: '/technologies',
    name: 'Technologies',
    component: DashboardLayout,
    props: { childComponent: Technologies },
  },
  {
    path: '/clients',
    name: 'Clients',
    component: DashboardLayout,
    props: { childComponent: Clients },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: DashboardLayout,
    props: { childComponent: Projects },
  },
  {
    path: '/portfolios',
    name: 'Portfolios',
    component: DashboardLayout,
    props: { childComponent: Portfolios },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
