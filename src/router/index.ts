import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/report'
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('@/views/report/EvaluationReport.vue')
    }
  ]
});

export default router;
