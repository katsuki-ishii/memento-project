import { createRouter, createWebHistory } from 'vue-router';
import LifeCalendar from '../views/LifeCalendar.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LifeCalendar
  },
  {
    path: '/about',
    name: 'About',
    // ルートレベルのコード分割（遅延読み込み）
    // このルートが訪問されたときに、対応するコンポーネントのコードが初めてダウンロードされます。
    component: () => import('../views/About.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/request-password-reset',
    name: 'RequestPasswordReset',
    component: () => import('../views/RequestPasswordResetView.vue')
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: () => import('../views/ResetPasswordView.vue'),
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
