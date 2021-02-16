import { default as Admin } from "./admin/index.js"

let routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/home")
    },
    {
        path: "/login",
        name: "login",
        meta: { requireAuth: true },
        component: () => import("@/views/login")
    },
    {
        path: "/admin",
        component: () => import("@/views/admin"),
        children: Admin
    }
];
export default routes;