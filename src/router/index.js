import {createRouter, createWebHashHistory} from 'vue-router';
import GlobalFeed from '../views/GlobalFeed.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed,
  },
  // {
  //   path: '/globalFeed',
  //   name: 'globalFeed',
  //   component: GlobalFeed,
  // },
  {
    path: '/feed',
    name: 'yourFeed',
    //component: GlobalFeed,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: GlobalFeed,
  },
  {
    path: '/article/new',
    name: 'createArticle',
    //component: UserProfile,
  },
  {
    path: '/article/:slug',
    name: 'article',
    //component: UserProfile,
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    //component: UserProfile,
  },
  {
    path: '/settings',
    name: 'settings',
    //component: UserProfile,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    //component: UserProfile,
  },
  {
    path: '/profiles/:slug/favorite',
    name: 'userProfileFavorite',
    //component: UserProfile,
  },

  {
    path: '/about/:id',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
