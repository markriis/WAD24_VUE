import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue';
import SignupPage from '../views/SignupPage.vue';
import LoginPage from '../views/LoginPage.vue';
import AddPostPage from '../views/AddPostPage.vue'


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
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/addpost', 
    name: 'AddPostPage', 
    component: AddPostPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


export default router;
