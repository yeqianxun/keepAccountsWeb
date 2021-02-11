let Admin = [{
    path: "index",
    component: () => import("@/views/admin/components/index.vue")
}, {
    path: "settings",
    component: () => import("@/views/admin/components/settings.vue")
}];
export default Admin