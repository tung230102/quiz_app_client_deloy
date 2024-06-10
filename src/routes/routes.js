import { lazy } from "react";
import { HeaderOnly } from "~/layouts";

const PlayPage = lazy(() => import("~/pages/PlayPage"));
const DashboardPage = lazy(() => import("~/pages/DashboardPage"));
const ProfilePage = lazy(() => import("~/pages/ProfilePage"));
const UsersPage = lazy(() => import("~/pages/UsersPage"));
const QuestionsPage = lazy(() => import("~/pages/QuestionsPage"));
const AnswerPage = lazy(() => import("~/pages/AnswerPage"));

const routes = [
  {
    path: "/play",
    component: PlayPage,
    layout: HeaderOnly,
    permissions: ["user"],
    authPermissions: ["read"],
  },
  {
    path: "/profile",
    component: ProfilePage,
    layout: HeaderOnly,
    permissions: ["admin", "user"],
    authPermissions: ["*"],
  },
  {
    path: "/dashboard",
    component: DashboardPage,
    permissions: ["admin", "user"],
    authPermissions: ["read", "update"],
  },
  {
    path: "/users",
    title: "Users Management",
    component: UsersPage,
    permissions: ["admin"],
    authPermissions: ["read", "create", "update", "delete"],
  },
  {
    path: "/questions",
    title: "Questions Management",
    component: QuestionsPage,
    permissions: ["admin"],
    authPermissions: ["read", "create", "update", "delete"],
  },
  {
    path: "/questions/:id",
    title: "Answers Management",
    component: AnswerPage,
    permissions: ["admin"],
    authPermissions: ["read", "create", "update", "delete"],
  },
];

export { routes };
