import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/customize/complex/ReportDetail",
    },
    {
      path: "/report",
      name: "report",
      component: () => import("@/views/report/EvaluationReport.vue"),
    },
    {
      path: "/customize/complex/ReportDetail",
      name: "ReportDetail",
      component: () => import("@/views/customize/complex/ReportDetail.vue"),
    },
    {
      path: "/customize/complex/ReportList",
      name: "ReportList",
      component: () => import("@/views/customize/complex/ReportList.vue"),
    },
  ],
});

export default router;
