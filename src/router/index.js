import { createRouter, createWebHashHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue';
import SignupPage from '../views/SignupPage.vue';
import LoginPage from '../views/LoginPage.vue';
import AddPostPage from '../views/AddPostPage.vue'
import ContactPage from "@/views/ContactPage.vue";
import PostPage from "@/views/PostPage.vue";


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
  {
    path: '/about_us',
    name: 'ContactPage',
    component: ContactPage,
  },
  {
    path: '/post/:id',
    name: 'PostPage',
    component: PostPage,
    props: true
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// middleware to only allow to navigate to
// signup and login page
const public_routes = [ "SignupPage", "LoginPage", "ContactPage" ]
const authed_disallowed_routes = [ "SignupPage", "LoginPage" ]
const default_redirect = "LoginPage"
router.beforeEach( async ( to, from, next ) => {
  const res = await fetch( 'http://localhost:3000/api/check_jwt', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', //send cookies with the request
  });

  const is_authed = res.status === 200;

  // no route, redirect to login
  if ( to.name === undefined )
    return next({ name : default_redirect })

  // authed an in login/signup page
  if ( is_authed && authed_disallowed_routes.includes( to.name ) )
    return next({ name : "MainPage" })


  if ( !is_authed && !public_routes.includes( to.name ) )
    return next({ name : default_redirect });

  return next( );
} );


export default router;
