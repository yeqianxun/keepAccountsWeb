let Admin = [{
    path: "index",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/index.vue")
}, {
    path: "account-setting",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/account-setting/index.vue")
}, {
    path: "find-house",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/find-house/index.vue")
}, {
    path: "product-status",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/product-status/index.vue")
},
{
    path: "contact-us",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/contact-us/index.vue")
},
{
    path: "house-detail",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/house-detail/index.vue")
},
];
export default Admin