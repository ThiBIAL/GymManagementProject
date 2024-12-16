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
import CoachSchedule from '@/components/CoachSchedule.vue';

const routes = [
    { path: "/", component: Welcome, meta: { title: "Welcome to EasyFit" } },
    { path: "/Home", component: Home, meta: { requiresAuth: true, title: "Home - EasyFit" } },
    { path: "/SignIn", component: SignIn, meta: { title: "Sign In - EasyFit" } },
    { path: "/SignUp", component: SignUp, meta: { title: "Sign Up - EasyFit" } },
    { path: "/Account/:username", component: Account, meta: { requiresAuth: true, title: "Account - EasyFit" } },
    { path: "/BookCourse", component: BookCourse, meta: { requiresAuth: true, title: "Book a Course - EasyFit" } },
    { path: "/Member", component: Member, meta: { requiresAdmin: true, title: "Manage Members - EasyFit" } },
    { path: "/Subscription", component: Subscription, meta: { requiresAuth: true, title: "Subscription - EasyFit" } },
    { path:"/AddCourses",component:AddCourses, meta: { requiresCoach: true, title: "Add Courses - EasyFit" }},
    { path:"/AddFoodMonitoring", component:AddFoodMonitoring, meta: { requiresCoach: true, title: "Add food Monitoring - EasyFit" }},
    { path:"/CoachSchedule", component:CoachSchedule, meta: { requiresCoach: true, title: "Coach Schedule - EasyFit" }},
  ];  

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token');

    // Mise à jour du titre de la page
    if (to.meta.title) {
        document.title = to.meta.title;
    }

    // Vérifie si l'accès nécessite une authentification
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token) {
            alert('You need to be logged in to access this page');
            return next('/SignIn');
        }

        try {
            const response = await axios.get('/auth/validate', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = response.data.user;

            console.log('Authenticated user:', user);

            // Redirection si l'utilisateur tente d'accéder à un compte qui n'est pas le sien
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
    }

    // Vérifie si l'accès nécessite un rôle administrateur
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (!token) {
            alert('Access reserved to administrators');
            return next('/');
        }

        try {
            const response = await axios.get('/auth/validate', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = response.data.user;

            console.log('Authorization check:', user);

            if (user.role !== 'admin') {
                alert('Access reserved to administrators');
                return next('/'); // Retourne à la page d'accueil
            }

            next();
        } catch (error) {
            console.error('Authorization error:', error);
            alert('Session expired or unauthorized access.');
            localStorage.removeItem('token');
            return next('/SignIn');
        }
    }

    // Vérifie si l'accès nécessite un rôle coach
    if (to.matched.some(record => record.meta.requiresCoach)) {
        if (!token) {
            alert('Access reserved to coaches');
            return next('/');
        }

        try {
            const response = await axios.get('/auth/validate', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = response.data.user;

            console.log('Authorization check for coach:', user);

            if (user.role !== 'coach') {
                alert('Access reserved to coaches');
                return next('/'); // Retourne à la page d'accueil
            }

            next();
        } catch (error) {
            console.error('Authorization error:', error);
            alert('Session expired or unauthorized access.');
            localStorage.removeItem('token');
            return next('/SignIn');
        }
    }

    // Si aucune restriction n'est définie, poursuivre la navigation
    next();
});

export default router;
