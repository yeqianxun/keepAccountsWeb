let Admin = [{
    path: "index",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/index.vue")
}, {
    path: "settings",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/settings.vue")
}];
export default Admin