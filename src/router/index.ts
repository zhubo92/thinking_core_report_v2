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
      meta: {
        title: "思维芯测评",
      },
    },
    {
      path: "/customize/SemesterReport",
      name: "SemesterReport",
      component: () => import("@/views/customize/SemesterReport.vue"),
      meta: {
        title: "行为记录综合报告",
      },
    },
    {
      path: "/customize/ComplexReportList",
      name: "ComplexReportList",
      component: () => import("@/views/customize/ComplexReportList.vue"),
      meta: {
        title: "行为记录综合报告幼儿列表",
      },
    },
    {
      path: "/customize/GrowthRecord",
      name: "GrowthRecord",
      component: () => import("@/views/customize/GrowthRecord.vue"),
      meta: {
        title: "成长记录",
      },
    },
    {
      path: "/customize/SingleReport",
      name: "SingleReport",
      component: () => import("@/views/customize/SingleReport.vue"),
      meta: {
        title: "行为记录单次报告",
      },
    },
  ],
});

export default router;
