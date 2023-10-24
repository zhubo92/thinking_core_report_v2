import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/customize/GrowthRecord",
    },
    {
      path: "/report",
      name: "report",
      component: () => import("@/views/report/EvaluationReport.vue"),
    },
    {
      path: "/customize/ComplexReportDetail",
      name: "ComplexReportDetail",
      component: () => import("@/views/customize/ComplexReportDetail.vue"),
    },
    {
      path: "/customize/ComplexReportList",
      name: "ComplexReportList",
      component: () => import("@/views/customize/ComplexReportList.vue"),
    },
    {
      path: "/customize/GrowthRecord",
      name: "GrowthRecord",
      component: () => import("@/views/customize/GrowthRecord.vue"),
    },
  ],
});

export default router;
