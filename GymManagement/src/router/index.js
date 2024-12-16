import { createRouter, createWebHistory } from 'vue-router';
import Welcome from '../components/Welcome.vue';
import Home from '../components/Home.vue';
import SignIn from '../components/SignIn.vue';
import SignUp from '../components/SignUp.vue';
import Account from '../components/Account.vue';
import Subscription from '../components/Subscription.vue';
import BookCourse from '../components/BookCourse.vue';
import Member from '../components/Member.vue';
import axios from '../config/axiosInstance';
import AddCourses from '@/components/AddCourses.vue';
import CoachSchedule from '@/components/CoachSchedule.vue';
import AddFoodMonitoring from '@/components/AddFoodMonitoring.vue';
import CreateSubscription from '@/components/CreateSubscription.vue';

const routes = [
    { path: "/", component: Welcome, meta: { title: "Welcome to EasyFit" } },
    { path: "/Home", component: Home, meta: { title: "Home - EasyFit" } },
    { path: "/SignIn", component: SignIn, meta: { title: "Sign In - EasyFit" } },
    { path: "/SignUp", component: SignUp, meta: { title: "Sign Up - EasyFit" } },
    { path: "/Account/:username", component: Account, meta: { title: "Account - EasyFit" } },
    { path: "/BookCourse", component: BookCourse, meta: { title: "Book a Course - EasyFit" } },
    { path: "/Member", component: Member, meta: { title: "Manage Members - EasyFit" } },
    { path: "/Subscription", component: Subscription, meta: { title: "Subscription - EasyFit" } },
    { path:"/AddCourses",component:AddCourses},
    { path:"/AddFoodMonitoring", component:AddFoodMonitoring},
    { path:"/CoachSchedule", component:CoachSchedule},
    { path:"/CreateSubscription", component:CreateSubscription},
  ];  

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token');

    if (to.meta.title) {
        document.title = to.meta.title;
      }
    next();

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            alert('You need to be logged in to access this page');
            return next('/SignIn');
        }

        try {
            const response = await axios.get('/auth/validate', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = response.data.user; // Corrected to access user object

            console.log('Authenticated user:', user);

            if (to.name === 'Account' && to.params.username !== user.username) {
                return next(`/Account/${user.username}`);
            }

            next();
        } catch (error) {
            console.error('Authentication error:', error);
            alert('Session expired. Please log in again.');
            localStorage.removeItem('token');
            return next('/SignIn');
        }
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (!token) {
            alert('Access reserved to administrators');
            return next('/');
        }

        try {
            const response = await axios.get('/auth/validate', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = response.data.user; // Corrected to access user object

            console.log('Authorization check:', user);

            if (user.role !== 'admin') {
                alert('Access reserved to administrators');
                return next('/');
            }

            next();
        } catch (error) {
            console.error('Authorization error:', error);
            alert('Session expired or unauthorized access.');
            localStorage.removeItem('token');
            return next('/SignIn');
        }
    } else {
        next();
    }
});



export default router;