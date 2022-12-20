import { mapActions, mapState } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";
import AuthLayout from "../views/Layouts/AuthLayout.vue";
import DashboardLayout from "../views/Layouts/DashboardLayout.vue";
import AuthLogin from "../views/AuthPage/AuthLogin.vue";
import AuthSignup from "../views/AuthPage/AuthSignup.vue";
import AuthForgotPassword from "../views/AuthPage/AuthForgotPassword.vue";
import DashboardPage from "../views/DashboardPage.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/auth/login",
    },
    {
      path: "/login",
      redirect: "/auth/login",
    },
    {
      path: "/signup",
      redirect: "/auth/login",
    },
    {
      path: "/auth/",
      component: AuthLayout,
      children: [
        {
          path: "",
          redirect: "/login",
        },
        {
          path: "signup",
          component: AuthSignup,
        },
        {
          path: "login",
          component: AuthLogin,
        },
        {
          path: "forgot-password",
          component: AuthForgotPassword,
        },
      ],
    },
    {
      path: "/dashboard",
      component: DashboardLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: "",
          component: DashboardPage,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = mapState(useUserStore, ["authToken", "user"]);
  const userActions = { ...mapActions(useUserStore, ["fetchUserData"]) };

  const isAuthenticated = !!auth.authToken();
  const user = auth.user();

  if (isAuthenticated && !user._id) {
    userActions.fetchUserData();
  }

  if (!isAuthenticated && to.meta.requiresAuth) {
    return { path: "/login" };
  }

  if (isAuthenticated && (to.path === "/login" || to.path === "/signup")) {
    return { path: "/dashboard" };
  }
});

export default router;
