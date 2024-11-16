import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue';
import SignupPage from '../views/SignupPage.vue';
const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
