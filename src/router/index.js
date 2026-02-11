import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import UsersView from "@/views/UsersView.vue";
import AttendanceView from "@/views/AttendanceView.vue";
import ReportView from "@/views/ReportView.vue";
import PosView from "@/views/PosView.vue";
import IntegrationView from "@/views/IntegrationView.vue";
import NotificationView from "@/views/NotificationView.vue";
import SettingsView from "@/views/SettingsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/users",
      name: "users",
      component: UsersView,
    },
    {
      path: "/attendance",
      name: "attendance",
      component: AttendanceView,
    },
    {
      path: "/pos",
      name: "pos",
      component: PosView,
    },
    {
      path: "/reports",
      name: "reports",
      component: ReportView,
    },
    {
      path: "/integration",
      name: "integration",
      component: IntegrationView,
    },
    {
      path: "/notifications",
      name: "notifications",
      component: NotificationView,
    },
    {
      path: "/settings",
      name: "settings",
      component: SettingsView,
    },
  ],
});

export default router;
