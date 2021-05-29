import { default as Admin } from "./admin/index.js"

let routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/home")
    },
    {
        path: "/sign_in_up",
        name: "login",
        meta: { requireAuth: true },
        component: () => import("@/views/sign-in-up")
    },
    {
        path: "/admin",
        component: () => import("@/views/admin"),
        children: Admin
    }
];
export default routes;