// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import Information from "@/pages/Information/Information";

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        components: {default: Dashboard}
      },
      {
        path: 'information',
        name: 'information',
        components: {default: Information}
      },
    ]
  },
  {path: "*", component: NotFound},
];

export default routes;
