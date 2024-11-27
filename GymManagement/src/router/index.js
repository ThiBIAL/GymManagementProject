import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../components/Welcome.vue';
import Home from '../components/Home.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import Account from '../components/Account.vue';
import BookCourse from '../components/BookCourse.vue';
import Subscription from '../components/Subscription.vue';


const routes = [
  { path: "/", component: Welcome },
  { path: "/Home", component: Home, meta: { requiresAuth: true } },
  { path: "/SignIn", component: SignIn },
  { path: "/SignUp", component: SignUp },
  { path: "/Account/:username", component: Account, meta: { requiresAuth: true } },
  { path: "/BookCourse", component: BookCourse, meta: { requiresAuth: true } },
  {path: "/Subscription", component: Subscription},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = !!user;
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/SignIn');
  } else if (to.path === '/Account' && isAuthenticated) {
    next(`/Account/${user.username}`);
  } else {
    next();
  }
});

export default router;