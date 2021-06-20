let Admin = [{
    path: "index",
    name: "AdminHome",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/index.vue")
}, {
    path: "account-setting",
    name: "AccountSetting",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/account-setting/index.vue")
}, {
    path: "find-house",
    name: "FindHouse",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/find-house/index.vue")
}, {
    path: "product-status",
    name: "ProductStatus",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/product-status/index.vue")
},
{
    path: "contact-us",
    name: "ContactUs",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/contact-us/index.vue")
},
{
    path: "house-detail/:house_id",
    name: "HouseDetail",
    meta: {
        requireAuth: true
    },
    component: () => import("@/views/admin/components/house-detail/index.vue")
},
];
export default Admin