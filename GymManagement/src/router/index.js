import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
import Account from "../components/Account.vue";
import BookCourse from "../components/BookCourse.vue";

const routes = [
    { path: "/", component: Home},
    { path: "/SignIn", component: SignIn},
    { path: "/SignUp", component: SignUp},
    { path: "/Account/:username", component: Account, props: true},
    { path: "/BookCourse", component: BookCourse},
];

export default createRouter({
    history: createWebHistory(),
    routes,
  });