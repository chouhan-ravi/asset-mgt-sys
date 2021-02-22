import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        alias: "/login",
        name: "login",
        component: () => import("../components/UserComponent/UserLogin.vue")
    },
    {
        path: "/assets",
        name: "assets",
        component: () => import("../components/AssetComponent/AssetsList.vue")
    },
    {
        path: "/requests",
        name: "requests",
        component: () => import("../components/RequestComponent/RequestsList.vue")
    },
    {
        path: "/assets/:id",
        name: "asset",
        component: () => import("../components/AssetComponent/Asset.vue")
    },
    {
        path: "/addAsset",
        name: "addAsset",
        component: () => import("../components/AssetComponent/AddAsset.vue")
    }

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    //console.log(to,from);
    if(to.path != '/' && localStorage.userType == ''){
        localStorage.userType = '';
        next("/");
    } else if(to.path == '/') {
        localStorage.userType = '';
        next();
    } else {
        next();
    }
});

export default router;